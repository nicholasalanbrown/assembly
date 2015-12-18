import React from 'react-native';
import Globals from '../../styles/globals';
import Hero from '../shared/hero';
import UserCell from '../shared/userCell';
import createEvent from '../events/createEvent';
import UserProfile from '../users/userProfile';
import _ from 'underscore';

let {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class ViewGroup extends React.Component{
  constructor(props){
    super(props);
    this._addUserstoGroup = this._addUserstoGroup.bind(this);
    this.state = {
      memberData: []
    }
  }
  _addUserstoGroup() {
    let groupData = this.props.groupData;
    this.props.loading(true);
    fetch('http://localhost:2403/users?{"$limit": 10}', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                this.props.loading(false);
                console.log(data.errors);
            }
            else {
              let groupUsers = data;
                _.each(groupUsers, function(user) {
                  fetch('http://localhost:2403/groups/'+groupData.id, {
                          method: "PUT",
                          headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({"groupMembers": {"$push": user.userId}})
                      })
                      .then((response) => response.json())
                      .then((data) => {
                          if (data.errors) {
                              console.log(data.errors);
                          }
                          else {
                          }
                      })
                      .catch((error) => console.log(error))
                      .done();
                })
            }
        })
        .catch((error) => console.log(error))
        .done();
        this.props.loading(false);
  }
  _getMembers() {
    this.props.loading(true);
    let api = 'http://localhost:2403/users?{"userId":{"$in":'+JSON.stringify(this.props.groupData.groupMembers)+'}}';
    console.log(api);
    fetch(api, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                this.setState({memberData: data})
                console.log(data);
            }
        })
        .catch((error) => console.log(error))
        .done();
    this.props.loading(false);
  }
  componentWillMount() {

    let groupData = this.props.groupData;
    this._addUserstoGroup();
    this._getMembers();

  }
  render(){
      console.log(this.props);
      let _this = this;
      let members = this.state.memberData.map(function(member, index) {
        return (
          <TouchableOpacity key={index} onPress={() =>
            _this.props.navigator.push({
              title: "User Profile",
              component: UserProfile,
              passProps: {
                otherUser: member,
                currentUser: _this.props.user
              }
            })
          }>
            <UserCell key={index} userData={member} />
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView style={styles.container}>
          <Hero title={this.props.groupData.groupName} layout="normalLayout" />
            { this.props.groupData.createdBy === this.props.user.userId ?
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'New Event',
                  component: createEvent,
                  passProps: {
                    loading: this.props.loading,
                    uiBlocker: this.props.uiBlocker,
                    user: this.props.user,
                    groupId: this.props.groupData.groupId
                  }
                })
              }
            }
            style={Globals.button}>
              <Text style={Globals.buttonText}>Create a New Event</Text>
            </TouchableOpacity>
            :
            null
            }
          <Text style={Globals.heading}>About this Group</Text>
          <Text style={Globals.bodyText}>{this.props.groupData.groupDescription}</Text>
          <Text style={Globals.heading}>{this.state.memberData.length} Members</Text>
          {members}
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = ViewGroup;
