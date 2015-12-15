import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';

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
        <View style={this.props.layout === "centerLayout" ? styles.centerLayout : styles.normalLayout}>
          <Text style={styles.title}>{this.props.title}</Text>
          {this.props.children}
        </View>
      )
    }
};

const styles = StyleSheet.create({
  centerLayout: {
    height: 240,
    backgroundColor: Colors.inactive,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  normalLayout: {
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
