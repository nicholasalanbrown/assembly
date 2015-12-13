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

class GroupCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
      return (
        <TouchableOpacity style={styles.card}>
          <Text style={styles.text}>{this.props.groupName}</Text>
        </TouchableOpacity>
      )
    }
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: deviceWidth/2-20,
    marginVertical: 6,
    padding: 20,
    backgroundColor: Colors.brandPrimary,
    justifyContent: 'flex-end'
  },
  text: {
    color: '#ffffff',
    fontWeight: '700'
  }
});

module.exports = GroupCard;
