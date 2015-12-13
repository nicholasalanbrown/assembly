import React from 'react-native';
import globals from '../styles/globals';

let {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  WebView
} = React;

class userProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  _nextRoute() {
    this.props.navigator.push({
      title: 'Home',
      component: Home
    })
  }
  render(){
      return (
        <WebView url="http://localhost:2403/auth/facebook/" />
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});

module.exports = userProfile;
