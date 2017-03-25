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
  barMenu: {
    flex: 0.08,
    paddingTop:20,
    alignSelf: 'stretch',
    backgroundColor: '#C6492D',
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
});



export default HeaderMenu;