import React, {Component} from 'react';
import {StyleSheet, View, Image, Button, Text, TouchableHighlight} from 'react-native';
import button from 'react-native-button';


class HeaderMenu extends Component{

  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.user){
      return(
        <View style={styles.barMenu}>
          <View style={styles.containerLogoTitle}>
            <Image style={styles.logoTitle} source={require('../../img/logo.png')} />
          </View>
          <View style={styles.containerBarTitle}>
            <Text style={styles.barTitle}>Bazaar</Text>
          </View>
          <View style={styles.containerLogoTitle}>
          </View>
        </View>

      );
    }

    if(this.props.user){
      return(
        <View style={styles.barMenu}>
          <View style={styles.containerLogoTitle}>
            <Image style={styles.logoTitle} source={require('../../img/logo.png')} />
          </View>
          <View style={styles.containerBarTitle}>
            <Text style={styles.barTitle}>Bazaar</Text>
          </View>
          <View style={styles.containerImageTitle}>
            <Image style={styles.profileImage} source={{ uri: this.props.user.photo }} />
          </View>
        </View>
      );
    }

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


export default HeaderMenu;
