import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import ViewEvent from '../events/viewEvent';
import moment from 'moment';

let {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} = React;


class EventCell extends React.Component{
  render () {
    let _this = this;
    console.log(this.props);
    let location = this.props.eventData.eventLocation.terms.map(function(term,index) {
      switch(index) {
          case 0:
              return term.value+' ';
              break;
          case 1:
              return term.value + ', ';
              break;
          case 2:
              return term.value + ', ';
              break;
          case 3:
              return term.value;
              break;
      }
    });
    return (
        <TouchableOpacity onPress={() => 
          _this.props.navigator.push({
            title: 'View Event',
            component: ViewEvent,
            passProps: {
              eventData: _this.props.eventData,
              loading: _this.props.loading,
              user: _this.props.user
            }
          })
        }>
        <View style={styles.cell}>
          <Text style={styles.title}>{this.props.eventData.eventName}</Text>
          <Text style={styles.date}>{moment(this.props.eventData.eventDate).format("dddd, MMMM Do, h:mm A")}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </TouchableOpacity>
    )
  }
};

var styles = StyleSheet.create({
  cell: {
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.inactive
  },
  placeholder: {
    fontSize: 16,
    color: Colors.placeholderColor
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.bodyText,
  }
});

module.exports = EventCell;
