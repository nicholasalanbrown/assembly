import React from 'react-native';
import Globals from '../styles/globals';
import Input from './shared/input';
import Loading from './shared/loading';
import _ from 'underscore';

let {
    View,
    ScrollView,
    Text,
    DatePickerIOS,
    TouchableOpacity,
    StyleSheet,
} = React;

class Create extends React.Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._onDateChange = this._onDateChange.bind(this);
        this.state = {
            data: null,
            groupId: "12345",
            formData: {
                eventName: "",
                eventDescription: "",
                eventDate: new Date()
            }
        }
    }
    _createEvent() {
        this.props.loading(true);
        let requestData = this.state.formData;
        _.extend(requestData, {groupId: this.state.groupId});
        fetch("http://localhost:2403/events", {
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
                    console.log(data.errors);
                }
                else {
                    this.props.loading(false);
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
    _handleClick() {
        this.props.loading(true);
        this._createEvent();
    }
    _onDateChange(date) {
        this._handleChange("eventDate", date);
        console.log(this.state.formData);
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
                        type="datePicker"
                        date={this.state.formData.eventDate}
                        onDateChange={this._onDateChange}
                    />
                    <Input
                        label="Wat time is the event?"
                        name="eventTime"
                        type="timePicker"
                        date={this.state.formData.eventDate}
                        onDateChange={this._onDateChange}
                    />
                    <TouchableOpacity onPress={this._handleClick} style={[Globals.button, styles.button]}>
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
        alignSelf: 'flex-end'
    }
});

module.exports = Create;
