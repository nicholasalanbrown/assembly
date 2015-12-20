import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import Input from '../shared/input';
import Loading from '../shared/loading';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


let {
    View,
    ScrollView,
    Text,
    DatePickerIOS,
    TouchableOpacity,
    StyleSheet,
} = React;

class createEvent extends React.Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._onDateChange = this._onDateChange.bind(this);
        this.state = {
            data: null,
            formData: {
                eventName: "",
                eventDescription: "",
                eventDate: new Date(),
                eventLocation: {}
            }
        }
    }
    _createEvent() {
        this.props.loading(true);
        let requestData = this.state.formData;
        Object.assign(requestData, {groupId: this.props.groupId, createdBy: this.props.user.userId});
        fetch(Config.apiBaseUrl+"/events", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.errors) {
                    this.props.loading(false);
                    this.props.uiBlocker(null);
                    console.log(data.errors);
                }
                else {
                    this.props.loading(false);
                    this.props.uiBlocker(null);
                    console.log(data);
                }
            })
            .catch((error) => console.log(error))
            .done();
    }
    _handleChange(name, text) {
        let formData = this.state.formData;
        formData[name] = text;
        this.setState({
          formData: formData
        });
    }
    _handleSubmit() {
        this.props.loading(true);
        this.props.uiBlocker("Creating event...");
        this._createEvent();
    }
    _onDateChange(date) {
        this._handleChange("eventDate", date);
    }
    render() {
        return (
        <View style={{flex : 1}}>
            <View style={Globals.inactiveContainer}>
                <ScrollView style={styles.scrollView}>
                    <Input
                      placeholder="this is a placeholder"
                      label="What's the event name?"
                      name="eventName"
                      value={this.state.formData.eventName}
                      handleChange={this._handleChange}
                    />
                    <Input
                      placeholder="this is a placeholder"
                      label="What's happening at the event?"
                      type="textarea"
                      name="eventDescription"
                      value={this.state.formData.eventDescription}
                      handleChange={this._handleChange}
                    />
                    <Input
                        label="When is the event?"
                        name="eventDate"
                        type="dateTimePicker"
                        date={this.state.formData.eventDate}
                        onDateChange={this._onDateChange}
                    />
                    <View style={Globals.inputContainer}>
                      <Text style={Globals.inputLabel}>Where is the event?</Text>
                      {this.state.error ?
                        <Text style={Globals.inputError}>{this.state.error}</Text>
                        :
                        null
                      }
                      <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                          console.log(data);
                          let object = Object.assign(data, details);
                          this._handleChange('eventLocation', object);
                          console.log(object);
                        }}
                        getDefaultValue={() => {
                          return ''; // text input default value
                        }}
                        query={{
                          // available options: https://developers.google.com/places/web-service/autocomplete
                          key: Config.googlePlacesApiKey,
                          language: 'en', // language of the results
                          types: 'address', // default: 'geocode'
                        }}
                        styles={{
                          description: {
                            backgroundColor: '#ffffff'
                          },
                          textInputContainer: {
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            backgroundColor: '#ffffff'
                          },
                          textInput: {
                            borderRadius: 0
                          },
                          row: {
                            backgroundColor: '#ffffff'
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                        }}

                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                          rankby: 'distance'
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                      />
                    </View>
                    <TouchableOpacity onPress={this._handleSubmit} style={[Globals.button, styles.button]}>
                      <Text style={Globals.buttonText}>Create Event</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
        )
    }
};

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 60
    },
    button: {
        marginTop: 50,
        alignSelf: 'flex-end'
    }
});

module.exports = createEvent;
