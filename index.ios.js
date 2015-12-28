
'use strict';

import React from 'react-native';
import Welcome from './application/components/welcome';
import Home from './application/components/home';
import Colors from './application/styles/colors';
import Globals from './application/styles/globals';
import Technologies from './application/technologies';
import Config from './config';
import Loading from './application/components/shared/loading';
import UIBlocker from './application/components/shared/uiBlocker';
import Modal from './application/components/shared/modal';
import FBLogin from 'react-native-facebook-login';
import faker from 'faker';
import seed from './application/utilities/seed';
import _ from 'underscore';

let {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  NativeModules,
  Easing,
  Animated,
  ActionSheetIOS,
  View,
  Dimensions,
  AsyncStorage,
  StatusBarIOS,
  DeviceEventEmitter
} = React;

let {FBLoginManager} = NativeModules;

//Create the root app component

class Assembly extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      user: {},
      uiBlocker: null,
      modal: false,
      modalProps: {title: "Technology Tags"},
      fakeData:[]
    }
  }
  _toggleLoading (bool) {
    this.setState({loading: bool});
  }
  _toggleBlocker (content) {
    this.setState({uiBlocker: content});
  }
  _findUser (userId) {
    this._toggleLoading(true);
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
              this._toggleLoading(false);
              console.log(data.errors);
            }
            else if (data.length > 0) {
                this._toggleLoading(false);
                console.log("User exists");
                let user = this.state.user;
                let userData = data[0];
                delete userData["id"];
                user.profile = userData.profile;
                this._setUser(user);
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
    this._toggleLoading(true);
    let user = this.state.user;
    user.username = "facebook_"+user.userId;
    user.password = "password";
    fetch("http://localhost:2403/users", {
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
                this._toggleLoading(false);
                console.log(data.errors);
            }
            else {
                this._toggleLoading(false);
                this._getUserProfile(data.id);
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _getUserProfile(id) {
    this._toggleLoading(true);
    let user = this.state.user;
    let api = "https://graph.facebook.com/me?fields=id,name,email&access_token="+user.token;
    fetch(api, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                this._toggleLoading(false);
                console.log(data.errors);
            }
            else {
                data.picture = "https://graph.facebook.com/"+user.userId+"/picture?type=large";
                user.profile = data;
                this.setState({user: user})
                this._setUser(user);
                this._updateUser(id);
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _updateUser(id) {
    this._toggleLoading(true);
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
                this._toggleLoading(false);
                console.log(data.errors);
            }
            else {
                this._toggleLoading(false);
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _setUser (data) {
    this.setState({user: data});
  }
  _openModal (props) {
    this.setState({modalProps: props, modal: true});
  }
  componentWillMount () {
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["Logout"],
        (eventData) => {
        this.setState({user: {}});
    });
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["Login"],
        (eventData) => {
        let user = this.state.user;
        user.userId = eventData.credentials.userId;
        user.token = eventData.credentials.token;
        user.tokenExpirationDate = eventData.credentials.tokenExpirationDate;
        this.setState({user: user});
        this._findUser(user.userId);
    });
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["LoginFound"],
        (eventData) => {
        let user = this.state.user;
        user.userId = eventData.credentials.userId;
        user.token = eventData.credentials.token;
        user.tokenExpirationDate = eventData.credentials.tokenExpirationDate;
        this.setState({user: user});
        this._findUser(user.userId);
    });
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["LoginNotFound"],
        (eventData) => {
          console.log("loginnotfound");
        this.setState({user: {}})
    });
    // seed();

  }
  render() {
    StatusBarIOS.setStyle('light-content');
    let modal;
    if (this.state.modal) {
      modal = <Modal title={this.state.modalProps.title} />
    }
    else {
      modal = null;
    }
    return (
      <View style={styles.container}>
      <NavigatorIOS
          style={styles.container}
          barTintColor={Colors.brandPrimary}
          titleTextColor='#ffffff'
          tintColor='#ffffff'
          initialRoute={{
            component: Home,
            title: 'Home',
            passProps: {
              loading: this._toggleLoading.bind(this),
              uiBlocker: this._toggleBlocker.bind(this),
              setUser: this._setUser.bind(this),
              user: this.state.user
            },
          }}
        />
        {
          this.state.loading ? <Loading /> : null
        }
        {
          this.state.uiBlocker ? <UIBlocker text={this.state.uiBlocker} /> : null
        }
      {Object.keys(this.state.user).length == 0 ?

      <Welcome loading={this._toggleLoading.bind(this)}
                setUser= {this._setUser.bind(this)}
      />
        :
      null
      }
      {modal}
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('Assembly', () => Assembly);
