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
    this._handleClick = this._handleClick.bind(this);
    this.state = {
      user: null
    }
  }
  _handleClick () {
    this.props.loading();
  }
  _findUser (userId) {
    this.props.loading(true)
    if (!userId ) {
      let userId = this.state.user.userId;
    }
    fetch("http://localhost:2403/users?userId="+ userId, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                this.props.loading(false);
                console.log(data.errors);
            }
            else if (data.length > 0) {
                this.props.loading(false);
                console.log("User exists");
                let user = data[0];
                console.log(user);
                delete user["id"];
                this.setState({user: user});
                this.props.setUser(user);
            }
            else {
                console.log("User doesnt exist");
                this._createUser();
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _createUser () {
    this.props.loading(true);
    let user = this.state.user;
    user.password = "password"
;    fetch("http://localhost:2403/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                this.props.loading(false);
                console.log(data.errors);
            }
            else {
                this.props.loading(false);
                this._getUserProfile(data.id);
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _getUserProfile(id) {
    console.log(id);
    this.props.loading(true);
    let user = this.state.user;
    let api = "https://graph.facebook.com/me?fields=id,name,email&access_token="+user.token;
    this.props.loading(true);
    fetch(api, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                this.props.loading(false);
                console.log(data.errors);
            }
            else {
                console.log(data);
                user.email = data.email;
                user.name = data.name;
                user.picture = "https://graph.facebook.com/"+user.userId+"/picture?type=large";
                this.setState({user: user})
                this.props.setUser(user);
                this._updateUser(id);
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _updateUser(id) {
    this.props.loading(true);
    fetch("http://localhost:2403/users/"+id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.user)
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
  }
  render(){
    let _this = this;
      return (
        <ScrollView style={styles.container}>
          <FBLogin style={{ marginBottom: 10, }}
            permissions={["email","user_friends"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={function(data){
              console.log("Logged in!");
              console.log(data);
              let user  = {
                username: "facebook_"+data.credentials.userId,
                userId: data.credentials.userId,
                token: data.credentials.token,
                tokenExpirationDate: data.credentials.tokenExpirationDate
              }
              _this.setState({ user : user });
              _this._findUser();
            }}
            onLogout={function(){
              console.log("Logged out.");
              _this.setState({ user : null });
              _this.props.setUser(null);
            }}
            onLoginFound={function(data){
              console.log("Existing login found.");
              _this._findUser(data.credentials.userId);
            }}
            onLoginNotFound={function(){
              console.log("No user logged in.");
              _this.setState({ user : null });
            }}
            onError={function(data){
              console.log("ERROR");
              console.log(data);
            }}
            onCancel={function(){
              console.log("User cancelled.");
            }}
            onPermissionsMissing={function(data){
              console.log("Check permissions!");
              console.log(data);
            }}
          />
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
