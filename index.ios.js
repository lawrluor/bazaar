/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import AddItemView from './AppCode/iOS/AddItemView.js'

// import Main from './main'
import Items from './AppCode/iOS/items';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import * as firebase from 'firebase';

//Initiaizing firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4T2rvQweJNcYi-DPt30XWRuf1BXviFJA",
  authDomain: "bazaar-2f761.firebaseapp.com",
  databaseURL: "https://bazaar-2f761.firebaseio.com/",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

var Bazaar = React.createClass({

  renderScene(route, navigator) {
    if (route.name == 'Main') {
      return <Main navigator={navigator} />
    }
    if (route.name == 'Items') {
      return <Items navigator={navigator} />
    }
    //addItem route - debug only
    if (route.name == 'addItem') {
      return <AddItemView navigator={navigator} firebaseDependencies={firebaseApp}/>
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
      user: null
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
    //If user is not registered
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <View style={styles.barMenu}>
            <View style={styles.containerLogoTitle}>
              <Image style={styles.logoTitle} source={require('./img/logo.png')} />
            </View>
            <View style={styles.containerBarTitle}>
              <Text style={styles.barTitle}>Bazaar</Text>
            </View>
            <View style={styles.containerLogoTitle}>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.titleBazaar}>Bazaar</Text>
              <Text style={styles.otherTitle}>"Connect, Exchange, Eat"</Text>
            </View>

            <Button style={styleButtonLogin.createStyle} containerStyle={styleButtonLogin.createButton} onPress={this._signIn.bind(this)}>
              <Image style={styleButtonLogin.logoGoogle} source={require('./img/logoGoogle.png')} />
              SIGN IN WITH GOOGLE
            </Button>
          </View>
          <View style={styles.debugView}>
            <Button
              onPress={this._navigateAddItem.bind(this)}>
              addItem view
             </Button> 
          </View>
        </View>
      );
    }

    //If user is registered
    if (this.state.user) {
      return (
        <View style={styles.container}>
          <View style={styles.barMenu}>
            <View style={styles.containerLogoTitle}>
              <Image style={styles.logoTitle} source={require('./img/logo.png')} />
            </View>
            <View style={styles.containerBarTitle}>
              <Text style={styles.barTitle}>Bazaar</Text>
            </View>
            <View style={styles.containerImageTitle}>
              <Image style={styles.profileImage} source={{ uri: this.state.user.photo }} />
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View>
              <Text>Hello {this.state.user.name} </Text>
              <Button style={styleButtonLogin.logoutStyle} containerStyle={styleButtonLogin.logoutButton} onPress={() => { this._signOut(); }}>
                Log out
              </Button>
            </View>
            <Text style={styles.heading}>Main Scene</Text>
            <TouchableHighlight style={styles.button} onPress={() => this._navigate()}>
              <Text style={styles.buttonText}>GO to Items</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
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
};

const styles = StyleSheet.create({
  //Change the background color to grey and make a header red

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
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
  containerBarTitle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barTitle: {
    color: '#FFFFFF',
    fontFamily: 'Futura',
    fontSize: 30,
  },
  containerLogoTitle: {
    flex: 0.3,
  },
  containerImageTitle: {
    flex: 0.3,
    alignItems: 'flex-end'
  },
  logoTitle: {
    margin: 20,
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    margin: 20,
    borderRadius: 25
  },
  bodyContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 50,
    backgroundColor: '#FFFFFF'
  },
  otherTitle: {
    color: '#444444',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  titleBazaar: {
    color: '#960819',
    fontSize: 60,
    fontFamily: 'Futura',
    textAlign: 'center'
  },
  debugView: {
    flex: 0.1,
  }
});
const styleButtonLogin = StyleSheet.create({

  logoutStyle: {
    color: '#FFFFFF'
  },
  logoutButton: {
    justifyContent: 'center',
    backgroundColor: '#E8001C',
    alignItems: 'center',
    borderRadius: 3,
    margin: 10,
    height: 40
  },
  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 3,
    margin: 10,
    height: 40,
  },
  createStyle: {
    fontSize: 14,
    padding: 8,
    paddingRight: 28,
    color: '#FFFFFF'
  },
  logoGoogle: {
    marginLeft: 0,
    paddingLeft: 0,
    height: 45,
    width: 45,
  }

});

AppRegistry.registerComponent('Bazaar', () => Bazaar);
