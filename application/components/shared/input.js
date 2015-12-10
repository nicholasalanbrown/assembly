import React from 'react-native';
import globals from '../../styles/globals';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
} = React;

class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      error: ''
    }
  }

  _nextRoute() {
  }
  render(){
      return (
      <View>
        <Text style={globals.inputLabel}>{this.props.label}</Text>
        {this.state.error ?
          <Text style={globals.inputError}>{this.state.error}</Text>
          :
          null
        }
        <TextInput
          style={globals.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder={this.props.placeholder}
        />
      </View>
      )
    }
};


Input.propTypes = { 
  placeholder: React.PropTypes.string  
};

const styles = StyleSheet.create({
});

module.exports = Input;
