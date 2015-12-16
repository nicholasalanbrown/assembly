import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import Avatar from '../shared/avatar';
import _ from 'underscore';

let {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
  }
  render(){
      return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Type a message..." 
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: Colors.inactive
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    paddingLeft: 12
  },
  sendButton: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendText: {
    color: Colors.brandPrimary
  }
});

module.exports = Chat;
