import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import Technologies from '../../technologies';
import Input from '../shared/input';
import Cell from '../shared/cell';
import Loading from '../shared/loading';

let {
    View,
    ScrollView,
    Text,
    DatePickerIOS,
    TouchableOpacity,
    StyleSheet,
} = React;

class SelectTechnology extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    _handlePress() {
    }
    render() {
        let technologyList = Technologies.sort().map(function(string, index) {
          return (
            <Cell key={index} text={string} arrow={false}/>
          );
        });
        return (
        <View style={{flex : 1}}>
            <View style={Globals.inactiveContainer}>
                <ScrollView style={styles.scrollView}>
                    {technologyList}
                </ScrollView>
            </View>
        </View>
        )
    }
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end'
    }
});

module.exports = SelectTechnology;
