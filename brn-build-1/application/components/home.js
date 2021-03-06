import React from 'react-native';
import Globals from '../styles/globals';
import createGroup from './groups/createGroup';
import MyGroups from './groups/myGroups';
import UserProfile from './users/userProfile';
import Messages from './users/messages';
import myProfile from './myProfile';
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
  InteractionManager,
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
        latitude        : 40.688816,
        longitude       : -73.988410,
        latitudeDelta   : 0.01,
        longitudeDelta  : 0.01
      },
      transitionDone    : false,
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({transitionDone: true})
    })
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
  _renderPlaceholderView(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  render(){
    let _this = this;
    let {transitionDone,} = this.state;
    if (! transitionDone) {
      return this._renderPlaceholderView();
    }
    return (
      <ScrollView style={styles.container}>
        <MapView
          style={Globals.map}
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
          style={Globals.button}>
            <Text style={Globals.buttonText}>New Event</Text>
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
          style={Globals.button}>
            <Text style={Globals.buttonText}>New Group</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>{
              this.props.navigator.push({
                name: 'My Groups',
                loading: this.props.loading,
                uiBlocker: this.props.uiBlocker,
                user: this.props.user
              })
            }}
            style={Globals.button}>
            <Text style={Globals.buttonText}>My Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{
              this.props.navigator.push({
                title: 'Messages',
                component: Messages,
                passProps: {
                  loading: this.props.loading,
                  uiBlocker: this.props.uiBlocker,
                  user: this.props.user
                }
              })
            }
          }
          style={Globals.button}>
            <Text style={Globals.buttonText}>Messages</Text>
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
  }
});

module.exports = Home;
