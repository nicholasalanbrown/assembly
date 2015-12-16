import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import Avatar from '../shared/avatar';
import _ from 'underscore';

let {
  View,
  ScrollView,
  Text,
  StyleSheet,
} = React;

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
      return (
        <View style={styles.container}>
        <ScrollView>
        </ScrollView>
        </View>
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

module.exports = Chat;
