import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import Avatar from './avatar';

let {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} = React;


class UserCell extends React.Component{
  render () {
    return (
        <View style={styles.cell}>
          <Avatar source={this.props.userData.profile.picture} />
          <Text style={styles.text}>{this.props.userData.profile.name}</Text>
        </View>
    )
  }
};

var styles = StyleSheet.create({
  cell: {
    height: 80,
    flexDirection: 'row',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.inactive
  },
  placeholder: {
    fontSize: 16,
    color: Colors.placeholderColor
  },
  text: {
    fontSize: 16,
    paddingLeft: 24,
    color: Colors.bodyText,
  }
});

module.exports = UserCell;
