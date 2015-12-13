/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import Welcome from './application/components/welcome';
import Home from './application/components/home';
import Colors from './application/styles/colors';
import Globals from './application/styles/globals';
import Loading from './application/components/shared/loading';
import FBLogin from 'react-native-facebook-login';
let FBLoginManager = require('NativeModules').FBLoginManager;

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

//Create the root app component

class Assembly extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      user: null
    }
  }
  _toggleLoading (bool) {
    this.setState({loading: bool});
  }
  _setUser (data) {
    console.log(data);
    console.log('setting new user state');
    this.setState({user: data});
  }
  componentWillMount () {
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["Logout"],
    (eventData) => {
      this.setState({user: null});
    });
  }
  render() {
    StatusBarIOS.setStyle('light-content');
    console.log(this.state.user);
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
      {!this.state.user ?

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
