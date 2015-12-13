import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';

let {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

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
    flex: 0.47,
    height: 150,
    margin: 8,
    padding: 20,
    justifyContent: 'flex-end',
    backgroundColor: Colors.brandPrimary
  },
  text: {
    color: '#ffffff',
    fontWeight: '700'
  }
});

module.exports = GroupCard;
