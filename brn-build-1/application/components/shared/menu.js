import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import CreateEvent from '../events/createEvent';

const {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Text,
} = React;

const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

class Menu extends React.Component {
  render() {
    return (
      <ScrollView style={styles.menu}>
        <TouchableOpacity onPress={
          this.props.navigator.push({
            title: 'New Event',
            component: CreateEvent,
          })
        }>
          <Text style={styles.item}>This is the Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 20,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    textAlign: 'right'
  },
});

module.exports = Menu;