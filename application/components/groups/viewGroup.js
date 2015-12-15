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
    this.props.loading(true);
    fetch("http://localhost:2403/users/{$limit: 10}", {
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
            }
        })
        .catch((error) => console.log(error))
        .done();
    _.each(groupUsers, function(groupUser) {
      fetch("http://localhost:2403/groups/"+this.props.groupData.id, {
              method: "PUT",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({groupMembers: {$push: groupUser.id}})
          })
          .then((response) => response.json())
          .then((data) => {
              if (data.errors) {
                  this.props.loading(false);
                  console.log(data.errors);
              }
              else {
                  this.props.loading(false);
                  console.log(data);
              }
          })
          .catch((error) => console.log(error))
          .done();
    })
  }
  componentWillMount() {
    this._addUserstoGroup();
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
