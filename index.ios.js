
'use strict';

import React from 'react-native';
import Welcome from './application/components/welcome';
import Home from './application/components/home';
import Colors from './application/styles/colors';
import Globals from './application/styles/globals';
import Loading from './application/components/shared/loading';
import FBLogin from 'react-native-facebook-login';
import faker from 'faker';
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
      fakeData:[]
    }
  }
  _toggleLoading (bool) {
    this.setState({loading: bool});
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
    /*
      let fakeData = []
      _.each(_.range(500), function(){
        var userId = faker.random.uuid();
        var username = "facebook_"+userId;
        var email = faker.internet.email();
        var name = faker.name.findName();
        var picture = faker.image.avatar();
        var newUser = {
          username: username,
          userId: userId,
          password: "password",
          profile: {
            id: userId,
            name: name,
            email: email,
            picture: picture
          }
        }
      let user = newUser;
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
                console.log(data.errors);
            }
            else {
            }
        })
        .catch((error) => console.log(error))
        .done();
      })
    */
  }
  render() {
    StatusBarIOS.setStyle('light-content');
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
              setUser: this._setUser.bind(this),
              user: this.state.user
            },
          }}
        />
        {
          this.state.loading ? <Loading /> : null
        }
      {Object.keys(this.state.user).length == 0 ?

      <Welcome loading={this._toggleLoading.bind(this)}
                setUser= {this._setUser.bind(this)}
      />
        :
      null
      }
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
