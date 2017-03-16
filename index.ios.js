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
  TouchableHighlight
} from 'react-native';

// import Main from './main'
import Items from './items'

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
  }
})

AppRegistry.registerComponent('Bazaar', () => Bazaar);
