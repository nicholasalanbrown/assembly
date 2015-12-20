import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import Input from '../shared/input';
import Loading from '../shared/loading';

let {
    View,
    ScrollView,
    MapView,
    Text,
    DatePickerIOS,
    TouchableOpacity,
    StyleSheet,
} = React;

class viewEvent extends React.Component {
    constructor(props) {
      super(props);
    this.state = {
        mapRegion: {
        latitude:   this.props.eventData.eventLocation.geometry.location.lat,
        longitude: this.props.eventData.eventLocation.geometry.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
        },
    }
    }
    render() {
        console.log(this.props);
        return (
        <View style={{flex : 1}}>
            <View style={Globals.inactiveContainer}>
              <MapView
                style={[Globals.map, styles.map]}
                region={this.state.mapRegion}
                annotations={[{latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude}]}
              />
            </View>
        </View>
        )
    }
};

const styles = StyleSheet.create({
    map: {
        marginTop: 64
    }
});

module.exports = viewEvent;
