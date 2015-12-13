/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import Welcome from './application/components/welcome';
import Colors from './application/styles/colors';
import Globals from './application/styles/globals';
import Loading from './application/components/shared/loading';

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
  StatusBarIOS
} = React;

//Create the root app component

class Assembly extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false
    }
  }
  _toggleLoading (bool) {
    this.setState({loading: bool});
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
            component: Welcome,
            title: 'Welcome',
            passProps: { loading: this._toggleLoading.bind(this)},
          }}
        />
        {
          this.state.loading ? <Loading /> : null
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
