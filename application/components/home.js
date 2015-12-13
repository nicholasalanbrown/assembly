import React from 'react-native';
import globals from '../styles/globals';
import Create from './create';
import myGroups from './myGroups';
import userProfile from './userProfile';
import chat from './chat';
import myProfile from './myProfile';
import viewGroup from './viewGroup';
import viewEvent from './viewEvent';
import FBLogin from 'react-native-facebook-login';
let NativeModules = require('react-native').NativeModules;
let FBLoginManager = require('NativeModules').FBLoginManager;

let {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class Home extends React.Component{
  constructor(props){
    super(props);
    this._handlePress = this._handlePress.bind(this);
    this.state = {
    }
  }
  _handlePress () {
    FBLoginManager.logout(function(error, data){
      if (!error) {
        console.log(data);
      } else {
        console.log("Error: ", data);
      }
    })
  }
  render(){
    let _this = this;
      return (
        <ScrollView style={styles.container}>
          <TouchableOpacity onPress={this._handlePress}>
            <Text>Logout</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'Home',
                  component: Home
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'Create',
                  component: Create,
                  passProps: {loading: this.props.loading}
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handleClick}
            style={globals.button}>
              <Text style={globals.buttonText}>My Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'User Profile',
                  component: userProfile
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>User Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'Chat',
                  component: chat
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'View Group',
                  component: viewGroup
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>View Group</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'View Event',
                  component: viewEvent
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>View Event</Text>
            </TouchableOpacity>
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = Home;
