import React from 'react-native';
import globals from '../styles/globals';
import Input from './shared/input';

let {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class Create extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  _nextRoute() {
    this.props.navigator.push({
      title: 'Home',
      component: Home
    })
  }
  render(){
      return (
        <View style={globals.inactiveContainer}>
          <Input 
            placeholder="this is a placeholder" 
            label="This is a label"
          />
        </View>
      )
    }
};

const styles = StyleSheet.create({
});

module.exports = Create;
