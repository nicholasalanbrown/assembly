import React from 'react-native';
import globals from '../styles/globalStyles';

let {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class Home extends React.Component{
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
        <View style={styles.container}>
            <TouchableOpacity onPress={this._nextRoute} style={globals.button}>
              <Text style={globals.buttonText}>Event</Text>
            </TouchableOpacity>
        </View>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});

module.exports = Home;
