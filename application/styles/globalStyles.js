import React from 'react-native';
import Colors from './colors';

let {
  StyleSheet,
  Dimensions,
} = React;

let {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');


let globalStyles = StyleSheet.create({
	button: {
		height: 60,
		width: deviceWidth*0.7,
		margin: 15,
		backgroundColor: Colors.brandPrimary,
		justifyContent: 'center'
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center'
	}
})

module.exports = globalStyles;
