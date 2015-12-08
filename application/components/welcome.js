import React from 'react-native';
import globals from '../styles/globalStyles';
import Home from './home';
import Create from './create';
import myGroups from './myGroups';
import userProfile from './userProfile';
import chat from './chat';
import myProfile from './myProfile';
import viewGroup from './viewGroup';
import viewEvent from './viewEvent';

let {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class Welcome extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
      return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'Home',
                  component: Home
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'Create',
                  component: Create
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'My Groups',
                  component: myGroups
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>My Groups</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'My Groups',
                  component: myGroups
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>User Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'Chat',
                  component: chat
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'View Group',
                  component: viewGroup
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>View Group</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
                this.props.navigator.push({
                  title: 'View Event',
                  component: viewEvent
                })
              }
            }
            style={globals.button}>
              <Text style={globals.buttonText}>View Event</Text>
            </TouchableOpacity>
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = Welcome;
