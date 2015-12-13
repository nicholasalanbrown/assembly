import React from 'react-native';
import Globals from '../styles/globals';
import Input from './shared/input';
import Loading from './shared/loading';

let {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} = React;

class Create extends React.Component {
    constructor(props) {
        super(props);
        this._handleChange = this._handleChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this.state = {
            data: null,
            formData: {
                groupName: "",
                groupDescription: ""
            }
        }
    }
    componentDidMount () {
        this.props.loading(true);
        fetch("http://localhost:2403/groups/", {
                method: "GET"
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
    _createEvent() {
        this.props.loading(true);
        fetch("http://localhost:2403/groups", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.formData)
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
    _nextRoute() {
        this.props.navigator.push({
            title: 'Home',
            component: Home
        })
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
    render() {
        return (
            <View style={{flex : 1}}>
          <Loading />
          <View style={Globals.inactiveContainer}>
            <Input
              placeholder="this is a placeholder"
              label="What's the event name?"
              name="groupName"
              value={this.state.formData.groupName}
              handleChange={this._handleChange}
            />
            <Input 
              placeholder="this is a placeholder" 
              label="What's happening at the event?"
              type="textarea"
              name="groupDescription"
              value={this.state.formData.groupDescription}
              handleChange={this._handleChange}
            />
            <TouchableOpacity onPress={this._handleClick} style={[Globals.button, styles.button]}>
              <Text style={Globals.buttonText}>Create Event</Text>
            </TouchableOpacity>
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

module.exports = Create;
