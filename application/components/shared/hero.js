import React from 'react-native';
import Globals from '../../styles/globals';

let {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} = React;

let {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

class Hero extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{this.props.title}</Text>
          {this.props.children}
        </View>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    height: 240,
    backgroundColor: '#000000',
    width: deviceWidth,
    justifyContent: 'flex-end',
    padding: 20
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700'
  }
});

module.exports = Hero;
