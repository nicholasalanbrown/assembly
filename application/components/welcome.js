import React from 'react-native';
import globals from '../styles/globals';
import Colors from '../styles/colors';
import Home from './home';
import Icon from 'react-native-vector-icons/Ionicons';
import FBLogin from 'react-native-facebook-login';
let NativeModules = require('react-native').NativeModules;
let FBLoginManager = require('NativeModules').FBLoginManager;

let {
  View,
  ScrollView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

let {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

class Welcome extends React.Component{
  constructor(props){
    super(props);
    this._handlePress = this._handlePress.bind(this);
    this.state = {
    }
  }
  _handlePress () {
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        return;
      } else {
        console.log("Error: ", data);
      }
    })
  }
  render(){
    let _this = this;
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require('../images/welcome.png')} />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={this._handlePress}>
            <Icon style={styles.icon} name="social-facebook" size={36} color={Colors.facebookBlue} />
            <Text style={styles.loginButtonText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
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
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  image: {
    height: deviceHeight,
    width: deviceWidth
  },
  loginButton: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.inactive,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    top: 20,
    left: 30
  },
  loginButtonText: {
    color: Colors.facebookBlue,
    fontSize: 16,
    fontWeight: '700'
  }
});

module.exports = Welcome;
