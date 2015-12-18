import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import Input from '../shared/input';
import Loading from '../shared/loading';

let {
    View,
    ScrollView,
    Text,
    DatePickerIOS,
    TouchableOpacity,
    StyleSheet,
} = React;

class viewEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
    render() {
        return (
        <View style={{flex : 1}}>
            <View style={Globals.inactiveContainer}>
            </View>
        </View>
        )
    }
};

const styles = StyleSheet.create({
});

module.exports = viewEvent;
