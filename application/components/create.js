import React from 'react-native';
import Globals from '../styles/globals';
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
    this._handleChange = this._handleChange.bind(this);
    this.state = {
      eventName: "Something",
      eventDescription: "Somewhere"
    }
  }

  _nextRoute() {
    this.props.navigator.push({
      title: 'Home',
      component: Home
    })
  }
  _handleChange(name, text) {
    this.setState({ [name]: text});
  }
  render(){
      return (
        <View style={Globals.inactiveContainer}>
          <Input 
            placeholder="this is a placeholder" 
            label="What's the event name?"
            name="eventName"
            value={this.state.eventName}
            handleChange={this._handleChange}
          />
          <Input 
            placeholder="this is a placeholder" 
            label="What's happening at the event?"
            type="textarea"
            name="eventDescription"
            value={this.state.eventDescription}
            handleChange={this._handleChange}
          />
        </View>
      )
    }
};

const styles = StyleSheet.create({
});

module.exports = Create;
