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
        initialRoute={{name: this.state.initialRoute, index: 0}}
        renderScene={(route, navigator) => {
          switch(route) {
            case 'welcome':
              return <Welcome navigator={navigator}/>
            break;
            default:
              return <Home
                      uiBlocker={this._toggleBlocker.bind(this)}
                      setUser={this._setUser.bind(this)}
                      user={this.state.user}
                      navigator={navigator}/>
            break;
          }
        }}/>
        {this.state.loading   ? <Loading />                               : null}
        {this.state.uiBlocker ? <UIBlocker text={this.state.uiBlocker} /> : null}
        {Object.keys(this.state.user).length == 0 ? <Welcome loading={this._toggleLoading.bind(this)} setUser={this._setUser.bind(this)}/> : null}
      </View>
    )

  }
  //
  //
  // _createUser () {
  //   this._toggleLoading(true);
  //   let user = this.state.user;
  //   user.username = "facebook_"+user.userId;
  //   user.password = "password";
  //   fetch("http://localhost:2403/users", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(user)
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.errors) {
  //       this._toggleLoading(false);
  //       console.log(data.errors);
  //     }
  //     else {
  //       this._toggleLoading(false);
  //       this._getUserProfile(data.id);
  //     }
  //   })
  //   .catch((error) => console.log(error))
  //   .done();
  // }
  // _getUserProfile(id) {
  //   this._toggleLoading(true);
  //   let user = this.state.user;
  //   let api = `https://graph.facebook.com/me?fields=id,name,email&access_token=${user.token}`;
  //   fetch(api, {
  //     method: "GET"
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.errors) {
  //       this._toggleLoading(false);
  //       console.log(data.errors);
  //     }
  //     else {
  //       data.picture = "https://graph.facebook.com/"+user.userId+"/picture?type=large";
  //       user.profile = data;
  //       this.setState({user: user})
  //       this._setUser(user);
  //       this._updateUser(id);
  //     }
  //   })
  //   .catch((error) => console.log(error))
  //   .done();
  // }
  // _updateUser(id) {
  //   this._toggleLoading(true);
  //   fetch("http://localhost:2403/users/"+id, {
  //     method: "PUT",
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(this.state.user)
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.errors) {
  //       this._toggleLoading(false);
  //       console.log(data.errors);
  //     }
  //     else {
  //       this._toggleLoading(false);
  //     }
  //   })
  //   .catch((error) => console.log(error))
  //   .done();
  // }
  //
  // _openModal (props) {
  //   this.setState({modalProps: props, modal: true});
  // }
  //
  //   // seedUsers(); // seed database
  // }
  // render() {
  //   let {modal,} = this.state;
  //   StatusBarIOS.setStyle('light-content');
  //   let modalContent = modal ? <Modal title={this.state.modalProps.title} /> : null;
  //
  //   return (
  //     <View style={styles.container}>
  //     <NavigatorIOS
  //       style={styles.container}
  //       barTintColor={Colors.brandPrimary}
  //       titleTextColor='#ffffff'
  //       tintColor='#ffffff'
  //       initialRoute={{
  //         component: Home,
  //         title: 'Home',
  //         passProps: {
  //           loading: this._toggleLoading.bind(this),
  //           uiBlocker: this._toggleBlocker.bind(this),
  //           setUser: this._setUser.bind(this),
  //           user: this.state.user
  //         },
  //       }}
  //     />
  //       {this.state.loading ? <Loading /> : null}
  //       {this.state.uiBlocker ? <UIBlocker text={this.state.uiBlocker} /> : null}
  //       {Object.keys(this.state.user).length == 0 ? <Welcome loading={this._toggleLoading.bind(this)} setUser= {this._setUser.bind(this)}/> : null}
  //       {modalContent}
  //     </View>
  //   );
  // }
};

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

AppRegistry.registerComponent('Assembly', () => Assembly);
