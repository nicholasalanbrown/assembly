import React from 'react-native';
import globals from '../styles/globals';
import createGroup from './groups/createGroup';
import myGroups from './groups/myGroups';
import UserProfile from './users/userProfile';
import myProfile from './myProfile';
import viewEvent from './viewEvent';
import FBLogin from 'react-native-facebook-login';

let NativeModules = require('react-native').NativeModules;
let FBLoginManager = require('NativeModules').FBLoginManager;

let {
  View,
  ScrollView,
  MapView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} = React;

let {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

class Home extends React.Component{
  constructor(props){
    super(props);
    this._handlePress = this._handlePress.bind(this);
    this.state = {
      mapRegion: {
        latitude:   40.688816,
        longitude: -73.988410,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      },
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
          <MapView
            style={styles.map}
            region={this.state.mapRegion}
            annotations={[{latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude}]}
          />
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'New Event',
                  component: createEvent,
                  passProps: {
                    loading: this.props.loading,
                    uiBlocker: this.props.uiBlocker,
                    user: this.props.user
                  }
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>New Event</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'New Event',
                  component: createGroup,
                  passProps: {
                    loading: this.props.loading,
                    uiBlocker: this.props.uiBlocker,
                    user: this.props.user
                  }
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>New Group</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'My Groups',
                  component: myGroups,
                  passProps: {
                    loading: this.props.loading,
                    uiBlocker: this.props.uiBlocker,
                    user: this.props.user
                  }
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>My Groups</Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={this._handlePress}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: 250,
    width: deviceWidth
  }
});

module.exports = Home;
