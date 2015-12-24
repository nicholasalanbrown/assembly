import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import Colors from '../../styles/colors';
import UserCell from '../shared/userCell';
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
      users: [],
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
                  this._getUsers();
                  console.log(data);
              }
          })
          .catch((error) => console.log(error))
          .done();
  }
  _getUsers() {
      let recipients = _.pluck(this.state.messages, 'recipient');
      let senders = _.pluck(this.state.messages, 'sender');
      let usersFromMessages = _.union(recipients, senders);
      fetch(Config.apiBaseUrl+'/users?{"userId":{"$in":'+JSON.stringify(usersFromMessages)+'}}', {
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
                  this.setState({users: data})
                  console.log(data);
              }
          })
          .catch((error) => console.log(error))
          .done();
  }
  componentWillMount () {
    this.props.loading(true);
    this._getMessages();
    this.props.loading(false);
  }
  render(){
    if (this.state.users.length > 0) {
      let user = _.sample(this.state.users);
      let message = _.sample(this.state.messages);
      return (
          <View style={styles.container}>
            <UserCell userData={user} tex={message.text} />
          </View>
        )
    }
    else {
      return (
          <View style={styles.container}>
          </View>
        )
    }
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
