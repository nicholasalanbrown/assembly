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

let globals = StyleSheet.create({
	inactiveContainer: {
		flex: 1,
		backgroundColor: Colors.inactive,
		justifyContent: 'center'
	},
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
	},
	inputContainer: {
		paddingBottom: 30
	},
	input: {
		borderWidth: 0,
		backgroundColor: '#ffffff',
		height: 50,
		paddingLeft: 12,
		fontSize: 16,
	},
	textarea: {
		borderWidth: 0,
		backgroundColor: '#ffffff',
		height: 100,
		paddingLeft: 12,
		paddingBottom: 8,
		fontSize: 16
	},
	inputError: {
		color: 'red',
		paddingHorizontal: 12,
		paddingBottom: 6
	},
	inputLabel: {
		color: Colors.bodyText,
		fontSize: 16,
		paddingHorizontal: 12,
		paddingBottom: 8
	}
})

module.exports = globals;
