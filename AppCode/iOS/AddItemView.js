import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, Button, Alert } from 'react-native';

class AddItemView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemPrice: '',
      itemExpDate: '',
      itemsRef: this.props.firebaseApp.database().ref()
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
        <View style={{ flex: 9.2 }}>
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
            style={styles.textInputExpiration}
            onChangeText={(text) => this.setState({ itemExpDate: text })}
            placeholder={"Enter item expiration date - Ex: 03/30/17"}
          />
          <Button
            onPress={() => this.submitItem()}
            title="Submit item"
          />
        </View>
      </View>
    );
  }

  addItemFirebase() {
    this.state.itemsRef.push({ name: this.state.itemName, price: this.state.itemPrice, expDate: this.state.itemExpDate })
  }

  submitItem() {
    console.log("submit item")
    //Checking if the name, the price, the expiration date are correct
    if (this.nameCheck() && this.priceCheck() && this.expDateCheck()) {
      //Add all the database code to submit the item
      this.addItemFirebase()
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
    if (this.state.itemPrice.slice(-1) != '$'){
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
    borderRadius: 5
  },
  textInputPrice: {
    height: 40,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5
  },
  textInputExpiration: {
    height: 40,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 50,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5,
  }
});

export default AddItemView;
