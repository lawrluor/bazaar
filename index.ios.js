import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight,
} from 'react-native';
import Button from 'react-native-button';

import AddItemView from './AppCode/iOS/AddItemView.js';
import LoginPage from './AppCode/iOS/LoginPage.js';
import HeaderMenu from './AppCode/iOS/HeaderMenu.js';
import ItemsView from './AppCode/iOS/ItemsView.js';
import NavigationBar from './AppCode/iOS/NavBar.js';
import ItemsPage from './AppCode/iOS/ViewComponents/ItemsPage.js'

// import Main from './main'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import * as firebase from 'firebase';

//Initiaizing firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4T2rvQweJNcYi-DPt30XWRuf1BXviFJA",
  authDomain: "bazaar-2f761.firebaseapp.com",
  databaseURL: "https://bazaar-2f761.firebaseio.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

//import {FBLogin, FBLoginManager} from 'react-native-facebook-login';


export default class Bazaar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      page: [true, false, false],
    };
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'itemsView' }}
        renderScene={this.renderScene.bind(this)}
      />
    )
  }

  renderScene(route, navigator) {
    if (route.name == 'Main') {
      return <Main navigator={navigator} _setupGoogleSignin={this._setupGoogleSignin.bind(this)} _signIn={this._signIn.bind(this)} _signOut={this._signOut.bind(this)} 
                    user={this.state.user} firebaseApp={firebaseApp}/>
    }
    //addItem route - debug only
    if (route.name == 'addItem') {
      return <AddItemView navigator={navigator} firebaseApp={firebaseApp} user={this.state.user}/>
    }
    if (route.name == 'itemsView') {
      return <ItemsView navigator={navigator} firebaseApp={firebaseApp} />
    }
    if (route.name == 'itemsPage') {
      return <ItemsPage navigator={navigator} firebaseApp={firebaseApp} {...route.passProps} />
    }
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '581614335691-30hbflqfc3r5sfpn0l6t6csskk65he6n.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({ user });
    }
    catch (err) {
      console.log("Google Signin error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        this.setState({ user: user });
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({ user: null });
    })
      .done();
  }

}

AppRegistry.registerComponent('Bazaar', () => Bazaar);


class Main extends Component {
  /**
  * Google Sign in
  */
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      page: [true, false, false],
    };
  }

  componentDidMount() {
    this.props._setupGoogleSignin();
  }

  _navigate(name) {
    this.props.navigator.push({
      name: 'Items',
      passProps: {
        name: name
      }
    })
  };

  _navigateAddItem() {
    this.props.navigator.push({
      name: 'addItem'
    })
  };


  render() {

    //If user is not registered
    return (
      <View style={styles.container}>
        <HeaderMenu user={this.state.user} />
        <LoginPage navigator={this.props.navigator} user={this.props.user} signIn={this.props._signIn} 
                    page={this.state.page} signOut={this.props._signOut} firebaseApp={this.props.firebaseApp} />
        <NavigationBar user={this.props.user} page={this.state.page} navigateItem={this._navigateAddItem.bind(this)} />
      </View>
    );
  }




};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});
