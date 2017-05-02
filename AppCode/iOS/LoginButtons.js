import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Button from 'react-native-button';

import Items from './items';

class LoginButtons extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount(){
    this._setupGoogleSignin();
  }

  render(){
    if(!this.state.user){
      return (
        <Button style={styles.createStyle} containerStyle= { styles.createButton } onPress={this._signIn.bind(this)}>
          <Image style={styles.logoGoogle} source={require('../../img/logoGoogle.png')} />
          SIGN IN WITH GOOGLE
        </Button>);
    }

    if(this.state.user){
      return(
        <View>
          <Text>Hello {this.state.user.name} </Text>
          <Button style={styles.logoutStyle} containerStyle= { styles.logoutButton } onPress={this._signOut()}>
            Log out
          </Button>
        </View>
      );
    }
  }


  async _setupGoogleSignin(){
    try{
      await GoogleSignin.hasPlayServices({autoResolve: true});
      await GoogleSignin.configure({
        iosClientId: '722603088219-9rf3vkglf4o0lr7ap4r9u21c12njtbhi.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err){
      console.log("Google Signin error", err.code, err.message);
    }

  }

  _signIn() {
      GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        this.setState({user: user});
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
    }

    _signOut() {
      GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        this.setState({user: null});
      })
      .done();
    }

}



const styles = StyleSheet.create({

  logoutStyle: {
    color: '#FFFFFF'
  },
  logoutButton: {
    justifyContent: 'center',
    backgroundColor: '#E8001C',
    alignItems: 'center',
    borderRadius: 3,
    margin: 10,
    height:40
  },
	createButton: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#4285F4',
	  borderRadius: 3,
		margin: 10,
		height:40,
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

export default LoginButtons;
