import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image, TouchableHighlight, ListView, ScrollView } from 'react-native';
import Button from 'react-native-button';
import ItemsRow from './ViewComponents/ItemsRow.js'

class LoginPage extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2})
    this.state={
      itemsRef: this.props.firebaseApp.database().ref(),
      dataSource: ds.cloneWithRows([]),
      itemsFirebase: [],
    }
  }

  componentWillMount(){
    this.listenForItems(this.state.itemsRef);
  }

  render(){
    if(this.props.user){
      return(
        <View style={styles.bodyContainer}>
          <View style={{width:350}}>
            <ListView
              enableEmptySections={true}
              key={this.state.dataSource}
              dataSource={this.state.dataSource}
              renderRow={(itemsFirebase) => <ItemsRow navigator={this.props.navigator} {...itemsFirebase} />}
            />
            <Button style={styleButtonLogin.logoutStyle} containerStyle={styleButtonLogin.logoutButton} onPress={this.props.signOut}>
              Log out
            </Button>
          </View>
        </View>
      );
    }

    if(!this.props.user){
      return(
        <View style={styles.bodyContainer} >
          <View>
            <Text style={styles.titleBazaar}>Bazaar</Text>
            <Text style={styles.otherTitle}>"Connect, Exchange, Eat"</Text>
          </View>
          <Button style={styleButtonLogin.createStyle} containerStyle= { styleButtonLogin.createButton } onPress={this.props.signIn}>
            <Image style={styleButtonLogin.logoGoogle} source={require('../../img/logoGoogle.png')} />
            SIGN IN WITH GOOGLE
          </Button>
        </View>
      );
    }

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
					_key: child.key
				});
			});

			console.log("items", items)

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items),
				itemsFirebase: items
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

export default LoginPage;
