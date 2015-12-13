import React from 'react-native';
import globals from '../styles/globals';
import Home from './home';
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

class Welcome extends React.Component{
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
    if (!userId) {
      console.log('no userId');
      let userId = this.state.user.userId;
    }
    console.log('finding user');
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
                delete user["id"];
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
              let user = {
                username: "facebook_"+data.credentials.userId,
                userId: data.credentials.userId,
                token: data.credentials.token,
                tokenExpirationDate: data.credentials.tokenExpirationDate
              }
              _this.setState({ user : user });
              _this._findUser(user.userId);
            }}
            onLogout={function(){
              console.log("Logged out.");
              _this.setState({ user : null });
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
          {this.state.user ? <Text>Logged in</Text> : <Text>Not Logged in</Text>}
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
});

module.exports = Welcome;
