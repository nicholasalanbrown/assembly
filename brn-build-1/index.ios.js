import React from 'react-native';
import _ from 'underscore';
import FBLogin from 'react-native-facebook-login';
import Welcome from './application/components/welcome';
import Home from './application/components/home';
import Colors from './application/styles/colors';
import Globals from './application/styles/globals';
import Config from './config';
import Loading from './application/components/shared/loading';
import UIBlocker from './application/components/shared/uiBlocker';
import Modal from './application/components/shared/modal';
import seedUsers from './application/utilities/seed_users';

let {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  NativeModules,
  Easing,
  Animated,
  ActionSheetIOS,
  View,
  Dimensions,
  AsyncStorage,
  StatusBarIOS,
  Navigator,
  DeviceEventEmitter
} = React;

let {FBLoginManager,} = NativeModules;

class Assembly extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      uiBlocker: false,
      user: {},
      initialRoute: 'home',
    }
  }
  componentWillMount () {
    DeviceEventEmitter.addListener(
      FBLoginManager.Events["Logout"],
        (eventData) => {
        this.setState({user: {}});
    });
    DeviceEventEmitter.addListener(FBLoginManager.Events["Login"], (eventData) => {
      let user = this.state.user;
      user.userId = eventData.credentials.userId;
      user.token = eventData.credentials.token;
      user.tokenExpirationDate = eventData.credentials.tokenExpirationDate;
      this.setState({user: user});
      this._findUser(user.userId);
    });
    DeviceEventEmitter.addListener(FBLoginManager.Events["LoginFound"], (eventData) => {
      let user = this.state.user;
      user.userId = eventData.credentials.userId;
      user.token = eventData.credentials.token;
      user.tokenExpirationDate = eventData.credentials.tokenExpirationDate;
      this.setState({user: user});
      this._findUser(user.userId);
    });
    DeviceEventEmitter.addListener(FBLoginManager.Events["LoginNotFound"], (eventData) => {
      console.log("login not found");
      this.setState({user: {}})
    });
  }
  _toggleLoading(bool) {
    this.setState({loading: bool});
  }
  _toggleBlocker(content) {
    this.setState({uiBlocker: content});
  }

  _setUser(data) {
    this.setState({user: data});
  }

  _findUser (userId) {
    this._toggleLoading(true);
    if (!userId) {
      console.log('no userId');
      let userId = this.state.user.userId;
    }
    console.log('finding user');
    let url = `http://localhost:2403/users?userId=${userId}`
    fetch(url, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        this._toggleLoading(false);
        console.log(data.errors);
      }
      else if (data.length > 0) {
        this._toggleLoading(false);
        console.log("User exists");
        let user = this.state.user;
        let userData = data[0];
        delete userData["id"];
        user.profile = userData.profile;
        this._setUser(user);
      }
      else {
        console.log("User doesn't exist");
        this._createUser();
      }
    })
    .catch((error) => console.log(error))
    .done();
  }

  render(){
    return (
      <View style={{flex: 1,}}>
      <Navigator
        style={styles.container}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{name: this.state.initialRoute, index: 0}}
        renderScene={(route, navigator) => {
          switch(route) {
            case 'welcome':
              return <Welcome navigator={navigator}/>
            break;
            default:
              return (
                      <Home
                        uiBlocker={this._toggleBlocker.bind(this)}
                        setUser={this._setUser.bind(this)}
                        user={this.state.user}
                        navigator={navigator}
                      />
                    )
            break;
          }
        }}/>
        {this.state.loading   ? <Loading />                               : null}
        {this.state.uiBlocker ? <UIBlocker text={this.state.uiBlocker} /> : null}
        {Object.keys(this.state.user).length == 0 ? <Welcome loading={this._toggleLoading.bind(this)} setUser={this._setUser.bind(this)}/> : null}
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('Assembly', () => Assembly);
