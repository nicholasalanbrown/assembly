import React from 'react-native';
import Globals from '../../styles/globals';
import Config from '../../../config';
import ViewGroup from './viewGroup';
import GroupCard from './groupCard';
import _ from 'underscore';

let {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  InteractionManager,
} = React;

class MyGroups extends React.Component{
  constructor(props){
    super(props);
    this._viewGroup = this._viewGroup.bind(this);
    this.state = {
      organizerData: [],
      memberData: [],
      transitionDone: false,
      loadGroups: false,
    }
  }
  _getOrganizerGroups () {
    // console.log('USER', this.props);
    fetch(Config.apiBaseUrl+"/groups?createdBy="+this.props.user.userId, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({groupsLoaded: true})
      if (data.errors) {
        console.log(data.errors);
      }
      else {
        this.setState({organizerData: data})
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .done();
  }
  _getMemberGroups () {
    let memberGroups = this.props.user.memberGroups;
    fetch(Config.apiBaseUrl+'/groups?{"id":{"$in":'+JSON.stringify(memberGroups)+'}}', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                this.setState({data: data})
            }
        })
        .catch((error) => console.log(error))
        .done();
  }

  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({transitionDone: true});
      this.props.loading(true);
      this._getOrganizerGroups();
      this._getMemberGroups();
      this.props.loading(false);
    });
  }
  _viewGroup(groupData) {
    this.props.navigator.push({
      title: 'View Group',
      component: ViewGroup,
      passProps: {
        groupData: groupData,
        loading: this.props.loading,
        uiBlocker: this.props.uiBlocker,
        user: this.props.user
      }
    })
  }
  _renderPlaceholderScene(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  render(){
      let _this = this;
      let {transitionDone, groupsLoaded,} = this.state;
      if (! transitionDone || ! this.state.groupsLoaded) {
        return this._renderPlaceholderScene();
      }
      let organizerGroups = this.state.organizerData.map(function(group) {
        return (
          <GroupCard groupData={group} viewGroup={_this._viewGroup} groupName={group.groupName} key={group.id} />
        );
      });

      return (
        <ScrollView style={styles.container}>
          <Text style={Globals.heading}>Groups You Organize</Text>
          <View style={Globals.twoColumnGridContainer}>
            {organizerGroups}
          </View>
          <Text style={Globals.heading}>Your Groups</Text>
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

module.exports = MyGroups;
