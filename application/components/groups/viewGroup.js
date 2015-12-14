import React from 'react-native';
import Globals from '../../styles/globals';
import Hero from '../shared/hero';

let {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class ViewGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
      return (
        <ScrollView style={styles.container}>
          <Hero title={this.props.groupData.groupName} />
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = ViewGroup;
