import React from 'react-native';
import globals from '../styles/globalStyles';
import Home from './home';
import Create from './create';
import myGroups from './myGroups';

let {
  View,
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
    console.log(this.props);
      return (
        <View style={styles.container}>
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
        </View>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = Welcome;
