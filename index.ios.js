
'use strict';

import React from 'react-native';
import Welcome from './application/components/welcome';
import Home from './application/components/home';
import Colors from './application/styles/colors';
import Globals from './application/styles/globals';
import Loading from './application/components/shared/loading';
import FBLogin from 'react-native-facebook-login';

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
      user: {}
    }
  }
  _toggleLoading (bool) {
    this.setState({loading: bool});
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
    });
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["LoginFound"],
        (eventData) => {
        let user = this.state.user;
        user.userId = eventData.credentials.userId;
        user.token = eventData.credentials.token;
        user.tokenExpirationDate = eventData.credentials.tokenExpirationDate;
        this.setState({user: user});
    });
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["LoginNotFound"],
        (eventData) => {
        this.setState({user: {}})
    });
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
              setUser: this._setUser.bind(this)
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
