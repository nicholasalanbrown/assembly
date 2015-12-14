import React from 'react-native';
import Globals from '../../styles/globals';
import ViewGroup from './viewGroup';
import GroupCard from './groupCard';

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
    this._viewGroup = this._viewGroup.bind(this);
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
            }
        })
        .catch((error) => console.log(error))
        .done();
  }
  _viewGroup(groupData) {
    this.props.navigator.push({
      title: 'View Group',
      component: ViewGroup,
      passProps: {
        groupData: groupData,
        loading: this.props.loading,
        user: this.props.user
      }
    })
  }
  render(){
      let _this = this;
      let myGroups = this.state.data.map(function(group) {
        return (
          <GroupCard groupData={group} viewGroup={_this._viewGroup} groupName={group.groupName} key={group.id} />
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
