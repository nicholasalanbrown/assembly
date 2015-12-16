import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
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
    this._sendMessage = this._sendMessage.bind(this);
    this.state = {
      text: ""
    }
  }
  _sendMessage() {
      let requestData = {
        sender: this.props.currentUser,
        recipient: this.props.otherUser,
        timestamp: new Date(),
        text: this.state.text
      }
      fetch(Config.apiBaseUrl+"/messages", {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData)
          })
          .then((response) => response.json())
          .then((data) => {
              if (data.errors) {
                  console.log(data.errors);
              }
              else {
                  console.log(data);
              }
          })
          .catch((error) => console.log(error))
          .done();
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
            <TouchableOpacity style={styles.sendButton} onPress={this._sendMessage}>
              <Text style={
                this.state.text ?
                styles.sendTextActive
                :
                styles.sendTextInactive
              }>Send</Text>
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
  sendTextInactive: {
    color: Colors.placeholderColor
  },
  sendTextActive: {
    color: Colors.brandPrimary
  }
});

module.exports = Chat;
