import React from 'react-native';
import Globals from '../../styles/globals';
import Hero from '../shared/hero';
import Avatar from '../shared/avatar';
import UserCell from '../shared/userCell';
import _ from 'underscore';

let {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class UserProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userData: {}
    }
  }
  render(){
    console.log(this.props);
      return (
        <ScrollView style={styles.container}>
          <Hero layout="centerLayout" >
            <Avatar size="large" source={this.props.userData.profile.picture} />
          </Hero>
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = UserProfile;
