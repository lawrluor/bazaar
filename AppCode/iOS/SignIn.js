import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ListView, ScrollView, AsyncStorage } from 'react-native';
import Button from 'react-native-button';
import ItemsRow from './ViewComponents/ItemsRow.js'

class SignInPage extends Component{


  constructor(props){
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  logIn(){
      this.setState({
        loading: true
      });
      // Log in and display an alert to tell the user what happened.
      this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
      ).then((userData) =>
        {
          this.setState({
            loading: false
          });
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          this.props.navigator.push({
            name: "itemsView"
          });
        }
      ).catch((error) =>
      {
        this.setState({
          loading: false
        });
        alert('Login Failed. Please try again'+error);
      });
    }


  render() {
      return (
        <View style={styles.bodyContainer} >
          <View style={styles.infoBazaar}>
            <Text style={styles.titleBazaar}>Bazaar</Text>
            <Text style={styles.otherTitle}>"Connect, Exchange, Eat"</Text>
          </View>

          <View style={styles.signUpInfo}>
            <TextInput placeholder="Email" style={styles.inputs} onChangeText={(text) => this.setState({email: text})}/>
            <TextInput placeholder="Password" style={styles.inputs} secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
            <TouchableOpacity onPress={this.logIn.bind(this)}>
              <Text>Log In</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
  }
}

const styles = StyleSheet.create({
  //Change the background color to grey and make a header red
  bodyContainer: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll'
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
  signUpInfo: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 375,
  },
  infoBazaar: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 375,
  },
  emailInput: {
    height: 40,
  },
  passwordInput: {
    height: 40,
  },
  inputs: {
    minHeight: 40,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
  },
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
  },

});

export default SignInPage;
