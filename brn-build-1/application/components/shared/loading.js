import React from 'react-native';
import Globals from '../../styles/globals';
import Colors from '../../styles/colors';
import Spinner from 'react-native-spinkit';

let {
  View,
  Text,
  TextInput,
  StyleSheet,
} = React;

class Loading extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
      return (
      <View style={styles.container}>
          <Spinner style={styles.spinner} isVisible={true} size={50} type='FadingCircle' color='#ffffff'/>
      </View>
      )
    }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 66,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    paddingTop: 150
  },
  spinner: {
    opacity: 1,
    color: '#ffffff'
  }
});

module.exports = Loading;
