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


var Bazaar = React.createClass({

  renderScene(route, navigator) {
    if (route.name == 'Main') {
      return <Main navigator={navigator} />
    }
    //addItem route - debug only
    if (route.name == 'addItem') {
      return <AddItemView navigator={navigator} firebaseApp={firebaseApp}/>
    }
    if (route.name == 'itemsView'){
      return <ItemsView navigator={navigator} firebaseApp={firebaseApp}/>
    }
    if (route.name == 'itemsPage'){
      return <ItemsPage navigator={navigator} firebaseApp={firebaseApp}/>
    }
  },
  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Main' }}
        renderScene={this.renderScene}
      />
    )
  }
});

class Main extends Component {
  /**
  * Google Sign in
  */
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this._setupGoogleSignin();
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
      console.log('USER:',this.props.user);
    //If user is not registered
    return (
      <View style={styles.container}>
        <HeaderMenu user={this.state.user}/>
        <LoginPage user={this.state.user} signIn={this._signIn.bind(this)} signOut={this._signOut.bind(this)} firebaseApp={firebaseApp}/>

        <View style={styles.debugView}>
          <Button
            onPress={this._navigateAddItem.bind(this)}>
            addItem view
           </Button>
        </View>
      </View>
    );
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

};

const styles = StyleSheet.create({
  //Change the background color to grey and make a header red

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  barMenu: {
    flex: 0.1,
    alignSelf: 'stretch',
    backgroundColor: '#C6492D',
    marginTop: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#960819',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  debugView: {
    flex: 0.1,
  }
});

AppRegistry.registerComponent('Bazaar', () => Bazaar);
