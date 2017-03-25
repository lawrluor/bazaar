import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

class AddItemView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemPrice: '',
      itemExpDate: ''
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
            onChangeText={(text) => this.setState({itemName: text})}
            placeholder={"Enter item name"}
          />
          <TextInput
            style={styles.textInputPrice}
            onChangeText={(text) => this.setState({itemPrice: text})}
            placeholder={"Enter item price"}
          />
          <TextInput
            style={styles.textInputExpiration}
            onChangeText={(text) => this.setState({itemExpDate: text})}
            placeholder={"Enter item expiration date - Ex: 03/30/17"}
          />
          <Button
            onPress={this.submitItem}
            title="Submit item"
          />
        </View>
      </View>
    );
  }

  submitItem() {
    //Checking if the name, the price, the expiration date are correct
    this.nameCheck()
    this.priceCheck()
    this.expDateCheck()
    //Add all the database code to submit the item
  }

  //Function checking if the name entered is correct
  nameCheck() {
    
  }

  //Function checking if the price entered is correct
  priceCheck() {

  }

  //Function checking if the expiration date entered is correct
  expDateCheck() {

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
