import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ListView, ScrollView } from 'react-native';
import Button from 'react-native-button';
import ItemsRow from './ViewComponents/ItemsRow.js'

class LoginPage extends Component{


  constructor(props){
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      itemsRef: this.props.firebaseApp.database().ref(),
      dataSource: ds.cloneWithRows([]),
      itemsFirebase: [],
      itemsSorted: [],
      myLocation: null,
      email: '',
      password: '',
      loading: false,
    }
  }

  componentWillMount() {
    this.retrievePosition();
    this.listenForItems(this.state.itemsRef);
  }

  retrievePosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({ myLocation: position });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  signUp() {
    this.setState({
      // When waiting for the firebase server show the loading indicator.
      loading: true
    });

    // Make a call to firebase to create a new user.
    this.props.firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password).then(() => {
        // then and catch are methods that we call on the Promise returned from
        // createUserWithEmailAndPassword
        this.props.user = true;
        alert('Your account was created!');
        this.setState({
          // Clear out the fields when the user logs in and hide the progress indicator.
          email: '',
          password: '',
          loading: false
        });
        this.props.navigator.push({
          name: "Main"
        });
    }).catch((error) => {
      // Leave the fields filled when an error occurs and hide the progress indicator.
      this.setState({
        loading: false
      });
      alert("Account creation failed: " + error.message );
    });
  }

  render() {
    console.log("USER", this.props.user)
    console.log("Firebase", this.state.itemsRef)
    if (this.props.user) {
      return (
        <View style={styles.bodyContainer}>
          <View style={{ width: 350 }}>
            <ListView
              enableEmptySections={true}
              key={this.state.dataSource}
              dataSource={this.state.dataSource}
              renderRow={(itemsSorted) => <ItemsRow navigator={this.props.navigator} {...itemsSorted} />}
            />
            <Button style={styleButtonLogin.logoutStyle} containerStyle={styleButtonLogin.logoutButton} onPress={this.props.signOut}>
              Log out
            </Button>
          </View>
        </View>
      );
    }

    if (!this.props.user) {
      return (
        <View style={styles.bodyContainer} >
          <View style={styles.infoBazaar}>
            <Text style={styles.titleBazaar}>Bazaar</Text>
            <Text style={styles.otherTitle}>"Connect, Exchange, Eat"</Text>
          </View>

          <View style={styles.signUpInfo}>
            <TextInput placeholder="Email" style={styles.inputs} onChangeText={(text) => this.setState({email: text})}/>
            <TextInput placeholder="Password" style={styles.inputs} secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
            <TouchableOpacity onPress={this.signUp.bind(this)}>
              <Text>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this._navigateLogin.bind(this)}>
              <Text>Log in</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    }

  }

  _navigateLogin(){
    this.props.navigator.push({
      name: 'SignIn'
    });
  }

  /*
  <Button style={styleButtonLogin.createStyle} containerStyle={styleButtonLogin.createButton} onPress={this.props.signIn}>
    <Image style={styleButtonLogin.logoGoogle} source={require('../../img/logoGoogle.png')} />
    SIGN IN WITH GOOGLE
  </Button>
  */

  calculateDistance(latitude, longitude) {
    if(this.state.myLocation != null){
      var R = 6371; // km
      var dLat = this.toRad(latitude - this.state.myLocation.coords.latitude);
      var dLon = this.toRad(longitude - this.state.myLocation.coords.longitude);
      var lat1 = this.toRad(this.state.myLocation.coords.latitude);
      var lat2 = this.toRad(latitude);

      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d * 0.621371; //Converting to miles
    }else{
      this.retrievePosition();
    }
  }

  toRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          price: child.val().price,
          quantity: child.val().quantity,
          expDate: child.val().expDate,
          latitude: child.val().latitude,
          longitude: child.val().longitude,
          distance: this.calculateDistance(child.val().latitude, child.val().longitude),
          _key: child.key,
          //userId: this.props.user.id
        });
      });

      console.log("items", items);

      var listSorted = [];
      listSorted = listSorted.sort((a, b) => {
        if (a.distance < b.distance) {
          return -1;
        }
        if (a.distance > b.distance) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        itemsFirebase: items,
        itemsSorted: listSorted,
      });

    });
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

export default LoginPage;
