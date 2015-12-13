import React from 'react-native';
import Globals from '../styles/globals';
import GroupCard from './groups/groupCard';

let {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

class MyGroups extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    this.props.loading(true);
    fetch("http://localhost:2403/groups?createdBy="+this.props.user.userId, {
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
                this.setState({data: data})
                console.log(this.state.data);
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  render(){
      let myGroups = this.state.data.map(function(group) {
        return (
          <GroupCard groupName={group.groupName} key={group.id} />
        );
      });
      return (
        <ScrollView style={styles.container}>
          <Text style={Globals.heading}>Your Groups</Text>
          <View style={Globals.twoColumnGridContainer}>
            {myGroups}
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

module.exports = MyGroups;
