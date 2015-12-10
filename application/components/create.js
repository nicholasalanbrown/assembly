import React from 'react-native';
import Globals from '../styles/globals';
import Input from './shared/input';

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
        this.state = {
            groupName: "Something",
            groupDescription: "Somewhere"
        }
    }
    componentDidMount() {
        fetch("http://localhost:2403/groups", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": "native group"
                })
            })
            .then( (response) => response.json() )
            .then( (data) => {
              if (data.errors)
                console.log(data.errors);
              else {
                console.log(data);
              }
             })
            .catch( (error) => console.log(error) )
            .done();
        fetch("http://localhost:2403/groups/", {
                method: "GET"
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
            .done();
    }
    _nextRoute() {
        this.props.navigator.push({
            title: 'Home',
            component: Home
        })
    }
    _handleChange(name, text) {
        this.setState({
            [name]: text
        });
    }
    render() {
        return (
            <View style={Globals.inactiveContainer}>
          <Input 
            placeholder="this is a placeholder" 
            label="What's the event name?"
            name="groupName"
            value={this.state.groupName}
            handleChange={this._handleChange}
          />
          <Input 
            placeholder="this is a placeholder" 
            label="What's happening at the event?"
            type="textarea"
            name="groupDescription"
            value={this.state.groupDescription}
            handleChange={this._handleChange}
          />
        </View>
        )
    }
};

const styles = StyleSheet.create({});

module.exports = Create;
