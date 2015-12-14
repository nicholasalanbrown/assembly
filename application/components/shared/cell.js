import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';

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
        </View>
    )
  }
};

var styles = StyleSheet.create({
});

module.exports = Cell;
