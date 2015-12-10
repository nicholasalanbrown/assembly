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
        this._handleClick = this._handleClick.bind(this);
        this.state = {
            groupName: "Something",
            groupDescription: "Somewhere"
        }
    }
    createEvent () {
        fetch("http://localhost:2403/groups", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
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
            .catch( (error) => console.log(error) )
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
    _handleClick() {
      this.createEvent();
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
            <TouchableOpacity onPress={this._handleClick} style={[Globals.button, styles.button]}>
              <Text style={Globals.buttonText}>Create Event</Text>
            </TouchableOpacity>
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
