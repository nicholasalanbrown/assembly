import React from 'react-native';
import Globals from '../../styles/globals';

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
      group: {}
    }
  }
  componentDidMount () {
    this.props.loading(true);
    fetch("http://localhost:2403/groups/"+this.props.groupId, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                this.props.loading(false);
                console.log(data.errors);
            }
            else {
                this.props.loading(false);
                this.setState({group: data})
                console.log(this.state.group);
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  render(){
    console.log(this.props);
      return (
        <ScrollView style={styles.container}>
          <Text style={Globals.heading}>View Groups</Text>
          <View style={Globals.twoColumnGridContainer}>
          </View>
        </ScrollView>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});

module.exports = ViewGroup;
