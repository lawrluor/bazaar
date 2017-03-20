import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


import Button from 'react-native-button';

class LoginButtons extends Component{
  render(){

    return (
      <Button style={styles.createStyle} containerStyle= { styles.createButton } >
        <Image style={styles.logoGoogle} source={require('./img/logoGoogle.png')}/>
        SIGN IN WITH GOOGLE
      </Button>);
  }

}

const styles = StyleSheet.create({

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
