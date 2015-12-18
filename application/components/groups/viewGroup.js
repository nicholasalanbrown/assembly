import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import Hero from '../shared/hero';
import EventCell from '../shared/eventCell';
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
      memberData: [],
      eventData: []
    }
  }
  _addUserstoGroup() {
    let _this = this;
    let groupData = this.props.groupData;
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
                            _this._addUserstoGroup();
                          }
                      })
                      .catch((error) => console.log(error))
                      .done();
                })
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _getEvents() {
    fetch(Config.apiBaseUrl+'/events?{"groupId":'+JSON.stringify(this.props.groupData.id)+'}', {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                this.setState({eventData: data})
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _getMembers() {
    let _this = this;
    this.props.loading(true);
    let api = 'http://localhost:2403/users?{"userId":{"$in":'+JSON.stringify(this.props.groupData.groupMembers)+'}}';
    fetch(api, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                if (data.length === 0) {
                      _this._addUserstoGroup();
                }
                else {
                  this.setState({memberData: data})
                }
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  componentWillMount() {
    this.props.loading(true);
    this._getMembers();
    this._getEvents();
    this.props.loading(false);
  }
  render(){
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
      let events = this.state.eventData.map(function(event, index) {
        return (
            <EventCell 
              key={index}
              navigator={_this.props.navigator} 
              eventData={event} 
              loading={_this.props.loading}
              user={_this.props.user}
            />
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
                    groupId: this.props.groupData.id
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
          <Text style={Globals.heading}>Events</Text>
          {events}
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
