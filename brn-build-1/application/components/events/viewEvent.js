import React from 'react-native';
import Colors from '../../styles/colors';
import Globals from '../../styles/globals';
import Config from '../../../config';
import UserProfile from '../users/userProfile';
import Input from '../shared/input';
import EventCell from '../shared/eventCell';
import UserCell from '../shared/userCell';
import Cell from '../shared/cell';
import Loading from '../shared/loading';
import moment from 'moment';

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
        this._toggleGoing = this._toggleGoing.bind(this);
        this._goToEvent = this._goToEvent.bind(this);
        this.state = {
            mapRegion: {
                latitude:   this.props.eventData.eventLocation.geometry.location.lat,
                longitude: this.props.eventData.eventLocation.geometry.location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            },
            going: this.props.eventData.going.indexOf(this.props.user.userId) !== -1 ? true : false,
            attendeeData: []
        }
    }
    _toggleGoing () {
        this.setState({going: !this.state.going})
        if (this.state.going) {
            this._goToEvent(true);
        }
        else {
            this._leaveEvent(false);
        }
    }
    _goToEvent() {
    fetch(Config.apiBaseUrl+'/events/'+this.props.eventData.id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({going: {$push: this.props.user.userId}})
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                console.log(data);
            }
        })
        .catch((error) => console.log(error))
        .done();
    }
    _leaveEvent() {
    fetch(Config.apiBaseUrl+'/events/'+this.props.eventData.id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({going: {$pull: this.props.user.userId}})
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                console.log(data);
            }
        })
        .catch((error) => console.log(error))
        .done();
    }
    _getAttendees() {
    let _this = this;
    let api = Config.apiBaseUrl+'/users?{"userId":{"$in":'+JSON.stringify(this.props.eventData.going)+'}}';
    fetch(api, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                console.log(data);
                  this.setState({attendeeData: data})
            }
        })
        .catch((error) => console.log(error))
        .done();
    }
    componentWillMount () {
        this._getAttendees();
    }
    render() {
        let _this = this;
        let attendees = this.state.attendeeData.map(function(attendee, index) {
        return (
          <TouchableOpacity key={index} onPress={() =>
            _this.props.navigator.push({
              title: "User Profile",
              component: UserProfile,
              passProps: {
                otherUser: attendee,
                currentUser: _this.props.user
              }
            })
          }>
            <UserCell key={index} userData={attendee} />
          </TouchableOpacity>
        );
        });
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
        <View style={{flex : 1}}>
            <View style={Globals.inactiveContainer}>
            <MapView
                style={[Globals.map, styles.map]}
                region={this.state.mapRegion}
                annotations={[{latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude}]}
            />
            <View style={styles.eventMeta}>
                <Text style={styles.title}>{this.props.eventData.eventName}</Text>
                <Text style={styles.date}>{moment(this.props.eventData.eventDate).format("dddd, MMMM Do, h:mm A")}</Text>
                <Text>{location}</Text>
            </View>
                <View style={styles.cell}>
                    <Text style={styles.attending}>Are you going?</Text>
                    <TouchableOpacity onPress={this.state.going === false ? this._toggleGoing : null}>
                        <Text style={this.state.going ? styles.selected : styles.unselected}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.state.going === true ? this._toggleGoing : null}>
                        <Text style={this.state.going ? styles.unselected : styles.selected}>No</Text>
                    </TouchableOpacity>
                </View>
                <Text style={Globals.heading}>{this.props.eventData.going.length} Going</Text>
                {attendees}
            </View>
        </View>
        )
    }
};

const styles = StyleSheet.create({
    map: {
        marginTop: 64
    },
    cell: {
        height: 90,
        flexDirection: 'row',
        paddingHorizontal: 24,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.inactive
    },
    eventMeta: {
        backgroundColor: '#ffffff',
        padding: 24
    },
    title: {
        fontWeight: '700',
        fontSize: 20,
        paddingBottom: 8
    },
    attending: {
        fontSize: 20,
        fontStyle: 'italic',
        color: Colors.bodyText,
        marginRight: 30
    },
    selected: {
        fontSize: 16,
        color: '#ffffff',
        backgroundColor: Colors.brandPrimary,
        padding: 12,
        borderRadius: 8
    },
    unselected: {
        fontSize: 16,
        color: Colors.brandPrimary
    },
});

module.exports = viewEvent;
