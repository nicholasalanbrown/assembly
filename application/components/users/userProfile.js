import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import Hero from '../shared/hero';
import Avatar from '../shared/avatar';
import Icon from 'react-native-vector-icons/Ionicons';
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
            <Text style={styles.name}>{this.props.userData.profile.name}</Text>
            <TouchableOpacity>
              <View style={styles.row}>
                <Icon style={styles.icon} name="ios-chatbubble" size={25} color={Colors.brandPrimary} />
                <Text style={styles.messageCTA}>Message</Text>
              </View>
            </TouchableOpacity>
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
  },
  name: {
    fontSize: 20,
    padding: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    transform: [{ scaleX: -1 }]  
  },
  messageCTA: {
    fontSize: 16,
    color: Colors.brandPrimary,
    padding: 12
  }
});

module.exports = UserProfile;
