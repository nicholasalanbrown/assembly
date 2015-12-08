/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react-native';
import Welcome from './application/components/welcome';

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
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            component: Welcome,
            title: 'Welcome'
          }}
        />
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
