import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';

let {
  View,
  Text,
  TextInput,
  DatePickerIOS,
  StyleSheet,
} = React;

class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }
  render(){
      switch (this.props.type) {
          case "textarea":
              inputType = (
                <TextInput
                  style={Globals.textarea}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={Colors.placeholderColor}
                  multiline={true}
                  value={this.props.value}
                  onChangeText={(text) => this.props.handleChange(this.props.name, text)}
                />
              );
              break;
          case "datePicker":
              inputType = (
                <DatePickerIOS
                    style={styles.datePicker}
                    date={this.props.date}
                    mode="date"
                    onDateChange={this.props.onDateChange}
                />
              )
              break;
          case "timePicker":
              inputType = (
                <DatePickerIOS
                    style={styles.datePicker}
                    date={this.props.date}
                    mode="time"
                    onDateChange={this.props.onDateChange}
                    minuteInterval={15}
                />
              )
              break;
          default:
              inputType = (
                <TextInput
                  style={Globals.input}
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  placeholder={this.props.placeholder}
                  placeholderTextColor={Colors.placeholderColor}
                  value={this.props.value}
                  onChangeText={(text) => this.props.handleChange(this.props.name, text)}
                />
              );
              break;
      }
      return (
      <View style={Globals.inputContainer}>
        <Text style={Globals.inputLabel}>{this.props.label}</Text>
        {this.state.error ?
          <Text style={Globals.inputError}>{this.state.error}</Text>
          :
          null
        }
        {inputType}
      </View>
      )
    }
};


Input.propTypes = {
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  onKeyUp: React.PropTypes.func,
  onBlur: React.PropTypes.func
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  }
});

module.exports = Input;
