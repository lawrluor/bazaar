import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, Button, Alert, Dimensions } from 'react-native';

class AddItemView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemPrice: '',
      itemQuantity: '',
      itemExpDate: '',
      itemsRef: this.props.firebaseApp.database().ref(),
      itemPosition: 'unknown',
    };
  }

  render() {
    return (
      <View style={{ flex: 10 }}>
        <View style={styles.navigatorTop}>
          <Text style={{ fontSize: 18 }}>
            {'AddItem View'}
          </Text>
        </View>
        <View style={styles.separatorHorizontal} />
        <View style={{ flex: 9.2, backgroundColor: '#960819' }}>
          <TextInput
            style={styles.textInputName}
            onChangeText={(text) => this.setState({ itemName: text })}
            placeholder={"Enter item name"}
          />
          <TextInput
            style={styles.textInputPrice}
            onChangeText={(text) => this.setState({ itemPrice: text })}
            placeholder={"Enter item price"}
          />
          <TextInput
            style={styles.textInputQuantity}
            onChangeText={(text) => this.setState({ itemQuantity: text })}
            placeholder={"Enter item quantity"}
          />
          <TextInput
            style={styles.textInputExpiration}
            onChangeText={(text) => this.setState({ itemExpDate: text })}
            placeholder={"Enter item expiration date - Ex: 03/30/17"}
          />
            </View>
          <View style={styles.buttonView}>
            <Button
              onPress={() => this.submitItem()}
              title="Submit item"
            />
          </View>
          <View style={styles.separatorHorizontal}/>
          <View style={styles.buttonView}>
          <Button
            onPress={() => this._navigate()}
            title="Go to item view"
          />
          </View>

      </View>
    );
  }

  _navigate() {
    this.props.navigator.push({
      name: 'itemsView',
    })
  }

  retrievePosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var position = JSON.stringify(position);
        this.setState({itemPosition: position});
        console.log(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  addItemFirebase() {
    this.state.itemsRef.push({ name: this.state.itemName, price: this.state.itemPrice, quantity: this.state.itemQuantity, expDate: this.state.itemExpDate, location: this.state.itemPosition })
  }

  submitItem() {
    console.log("submit item");

    console.log("GETTING ITEM POSITION: " + this.state.itemPosition);
    //Checking if the name, the price, the expiration date are correct
    if (this.nameCheck() && this.priceCheck() && this.quantityCheck() && this.expDateCheck()) {
      //Retrieve the location by GPS of the client
      this.retrievePosition();
      //Add all the database code to submit the item
      this.addItemFirebase();
    }
  }

  //Function checking if the name entered is correct
  nameCheck() {
    console.log("checking Name")
    if (this.state.itemName == '') {
      Alert.alert(
        'Error',
        'Enter a valid item name',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
        ],
        { cancelable: false }
      )
      return false
    }
    return true
  }

  //Function checking if the price entered is correct
  priceCheck() {
    console.log("checking price")
    if (this.state.itemPrice == '') {
      Alert.alert(
        'Error',
        'Enter a valid item name',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
        ],
        { cancelable: false }
      )
      return false
    }
    //Adding dollar symbol
    if (this.state.itemPrice.slice(-1) != '$') {
      var aux = this.state.itemPrice
      aux += '$'
      console.log("aux", aux)
      this.setState({
        itemPrice: aux
      },
        console.log("Yoouhou", this.state.itemPrice))
    }
    return true
  }

  quantityCheck() {
    console.log("checking quantity")
    if (this.state.itemQuantity == '') {
      Alert.alert(
        'Error',
        'Enter a valid item quantity',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
        ],
        { cancelable: false }
      )
      return false
    }
    return true
  }

  //Function checking if the expiration date entered is correct
  expDateCheck() {
    console.log("checking expiration date")
    if (this.state.itemExpDate == '') {
      Alert.alert(
        'Error',
        'Enter a valid item name',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
        ],
        { cancelable: false }
      )
      return false
    }
    return true
  }
}



const styles = StyleSheet.create({
  navigatorTop: {
    flex: 0.8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  separatorHorizontal: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#222222',
  },
  textInputName: {
    height: 40,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  textInputPrice: {
    height: 40,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  textInputQuantity: {
    height: 40,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  textInputExpiration: {
    height: 40,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  buttonView:{
    backgroundColor: 'white'
  }
});

export default AddItemView;
