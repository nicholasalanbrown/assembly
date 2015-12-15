import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

let {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} = React;


class Cell extends React.Component{
  render () {
    return (
        <View style={styles.cell}>
          {this.props.placeholder ? <Text style={styles.placeholder}>{this.props.placeholder}</Text> : null}
          <Icon name="ios-arrow-forward" size={25} color={Colors.placeholderColor} />
        </View>
    )
  }
};

var styles = StyleSheet.create({
  cell: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.inactive
  },
  placeholder: {
    fontSize: 16,
    color: Colors.placeholderColor
  }
});

module.exports = Cell;
