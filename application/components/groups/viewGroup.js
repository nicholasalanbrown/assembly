import React from 'react-native';
import Globals from '../../styles/globals';
import Hero from '../shared/hero';
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
    }
  }
  _addUserstoGroup() {
    let groupData = this.props.groupData;
    if (typeof groupData.groupMembers == 'undefined') {
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
                              
                              console.log(data);

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
  }
  componentDidMount() {
    this._addUserstoGroup();
    console.log(this.state);
  }
  render(){
    console.log(this.props);
      return (
        <ScrollView style={styles.container}>
          <Hero title={this.props.groupData.groupName} />
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
