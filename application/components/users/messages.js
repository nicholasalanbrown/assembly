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

class Messages extends React.Component{
  constructor(props){
    super(props);
    this._getMessages = this._getMessages.bind(this);
    this.state = {
      messages: []
    }
  }
  _getMessages() {
      let recipient = this.props.user.userId;
      fetch(Config.apiBaseUrl+"/messages?recipient="+recipient, {
              method: "GET",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => response.json())
          .then((data) => {
              if (data.errors) {
                  console.log(data.errors);
              }
              else {
                  this.setState({messages: data})
                  console.log(data);
              }
          })
          .catch((error) => console.log(error))
          .done();
  }
  componentWillMount () {
    this._getMessages();
  }
  render(){
      return (
        <View style={styles.container}>
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
  row: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'flex-end'
  },
  messageSent: {
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: Colors.brandPrimary,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    textAlign: 'right'
  },
  messageReceived: {
    color: Colors.bodyText,
    fontSize: 16,
    backgroundColor: Colors.inactive,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8
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

module.exports = Messages;
