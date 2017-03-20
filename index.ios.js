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
  TouchableHighlight
} from 'react-native';

// import Main from './main'
import Items from './items';

import LoginButtons from './LoginButtons';

var Bazaar = React.createClass({
  renderScene(route, navigator) {
    if(route.name == 'Main') {
      return <Main navigator={navigator} />
    }
    if(route.name == 'Items') {
      return <Items navigator={navigator} />
    }
  },
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Main' }}
        renderScene={ this.renderScene }
      />
    )
  }
});

var Main = React.createClass({
  _navigate(name) {
    this.props.navigator.push({
      name: 'Items',
      passProps: {
        name: name
      }
    })
  },
  render() {
    return (
      <View style={ styles.container }>
        <View>
          <Image style={styles.imageLogo} source={require('./img/logo.png')}/>
          <Text style={styles.titleBazaar}>Bazaar</Text>
        </View>

        <LoginButtons/>

        <Text style={ styles.heading }>Main Scene</Text>
        <TouchableHighlight style={ styles.button } onPress={ () => this._navigate() }>
          <Text style={ styles.buttonText }>GO to Items</Text>
        </TouchableHighlight>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#960819'
    },
  title: {
      fontSize: 50,
      backgroundColor: '#FFFFFF'
  },
  titleBazaar: {
    color: '#FFFFFF',
    fontSize: 60,
    fontFamily: 'Futura',
    marginBottom:50,
  },
  imageLogo: {
    margin: 20
  },
})

AppRegistry.registerComponent('Bazaar', () => Bazaar);
