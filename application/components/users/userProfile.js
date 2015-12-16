import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import Hero from '../shared/hero';
import Chat from './chat';
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
      otherUser: {}
    }
  }
  render(){
    console.log(this.props);
      let _this = this;
      let myInterests = this.props.otherUser.profile.interests.map(function(interest, index) {
        return (
          <Text key={index} style={styles.technology}>{interest}</Text>
        );
      });
      return (
        <ScrollView style={styles.container}>
          <Hero layout="centerLayout" >
            <Avatar size="large" source={this.props.otherUser.profile.picture} />
            <Text style={styles.name}>{this.props.otherUser.profile.name}</Text>
            <TouchableOpacity
            onPress={() =>{
                this.props.navigator.push({
                  title: 'Chat',
                  component: Chat,
                  passProps: {
                    otherUser: _this.props.otherUser.userId,
                    currentUser: _this.props.currentUser.userId
                  }
                })
              }
            }
            >
              <View style={styles.row}>
                <Icon style={styles.icon} name="ios-chatbubble" size={25} color={Colors.brandPrimary} />
                <Text style={styles.messageCTA}>Message</Text>
              </View>
            </TouchableOpacity>
          </Hero>
          <Text style={Globals.heading}>Interests</Text>
          <View style={styles.rowLeft}>
            {myInterests}
          </View>
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
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  icon: {
    transform: [{ scaleX: -1 }]  
  },
  messageCTA: {
    fontSize: 16,
    color: Colors.brandPrimary,
    padding: 12
  },
  technology: {
    color: Colors.bodyText,
    textAlign: 'left',
    fontSize: 16,
    padding: 8
  }
});

module.exports = UserProfile;
