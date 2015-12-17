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

class UIBlocker extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
      return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{this.props.text}</Text>
          <Spinner style={styles.spinner} isVisible={true} size={36} type='FadingCircle' color={Colors.brandPrimary}/>
        </View>
      </View>
      )
    }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    paddingTop: 150
  },
  contentContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    flex: 1,
    minWidth: 300,
    minHeight: 250,
    maxWidth: 300,
    maxHeight: 250,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: Colors.bodyText,
    paddingBottom: 30
  },
  spinner: {

  }
});

module.exports = UIBlocker;
