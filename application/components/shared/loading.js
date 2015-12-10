import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
} = React;

class Loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
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
    marginTop: 66,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#000000',
    opacity: 0.2
  }
});

module.exports = Loading;
