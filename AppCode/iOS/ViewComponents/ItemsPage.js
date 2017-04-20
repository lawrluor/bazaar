import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, Button, Alert } from 'react-native';

class ItemsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsRef: this.props.firebaseApp.database().ref(),
      _key: this.props._key,
      item: ''
    }
  }

  render() {
    console.log(this.getItemImage)
    return (
      <View style={{ flex: 10, marginTop: 20 }}>
        <View style={styles.topBar}>
          <TouchableHighlight underlayColor='grey' onPress={() => this.props.navigator.pop()}>
            <Image
              style={{ width: 28, height: 28 }}
              source={require('../../../img/back.png')}
            />
          </TouchableHighlight>
          <Button
            title="Buy"
            onPress={() =>
              Alert.alert(
                'Buying Alert',
                'Do you want to buy ' + this.props.quantity + ' ' + this.props.name + '(s) for ' + this.props.price + ' dollars?',
                [
                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
              )
            }
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.itemView}>
          <View style={styles.itemImageContainer}>
            <Image
              style={styles.itemImage}
              source={this.getItemImage()}
            />
          </View>
          <View style={styles.itemInfoContainer}>
            <Text style={styles.itemTitleText}>
              {this.props.name}
            </Text>
            <Text style={styles.itemText}>
              {"Quantity: " + this.props.quantity}
            </Text>
            <Text style={styles.itemText}>
              {"Price: " + this.props.price}
            </Text>
            <Text style={styles.itemText}>
              {"Expiration Date: " + this.props.expDate}
            </Text>
            <Text style={styles.itemText}>
              {"Distance: " + this.props.distance}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.userView}>

        </View>
      </View>
    )
  }


  getItemImage() {
    switch (this.props.name) {
      case 'cucumber':
        return require('../../../img/VegetablesAndFruitsIcons/cucumber.png')
      case 'Cucumber':
        return require('../../../img/VegetablesAndFruitsIcons/cucumber.png')
      case 'cucumbers':
        return require('../../../img/VegetablesAndFruitsIcons/cucumber.png')
      case 'Cucumbers':
        return require('../../../img/VegetablesAndFruitsIcons/cucumber.png')
      case 'tomato':
        return require('../../../img/VegetablesAndFruitsIcons/tomato.png')
      case 'tomatos':
        return require('../../../img/VegetablesAndFruitsIcons/tomato.png')
      case 'tomatoes':
        return require('../../../img/VegetablesAndFruitsIcons/tomato.png')
      case 'Tomato':
        return require('../../../img/VegetablesAndFruitsIcons/tomato.png')
      case 'Tomatos':
        return require('../../../img/VegetablesAndFruitsIcons/tomato.png')
      case 'Tomatoes':
        return require('../../../img/VegetablesAndFruitsIcons/tomato.png')
      case 'potato':
        return require('../../../img/VegetablesAndFruitsIcons/potatoes.png')
      case 'potatos':
        return require('../../../img/VegetablesAndFruitsIcons/potatoes.png')
      case 'potatoes':
        return require('../../../img/VegetablesAndFruitsIcons/potatoes.png')
      case 'Potato':
        return require('../../../img/VegetablesAndFruitsIcons/potatoes.png')
      case 'Potatos':
        return require('../../../img/VegetablesAndFruitsIcons/potatoes.png')
      case 'Potatoes':
        return require('../../../img/VegetablesAndFruitsIcons/potatoes.png')
      case 'salad':
        return require('../../../img/VegetablesAndFruitsIcons/cabbage.png')
      case 'Salad':
        return require('../../../img/VegetablesAndFruitsIcons/cabbage.png')
      case 'letuce':
        return require('../../../img/VegetablesAndFruitsIcons/cabbage.png')
      case 'Letuce':
        return require('../../../img/VegetablesAndFruitsIcons/cabbage.png')
      default:
        return require('../../../img/VegetablesAndFruitsIcons/salad.png')
    }
  }

}

const styles = StyleSheet.create({
  topBar: {
    flex: 0.8,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemView: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
  },
  itemImage: {
    width: 60,
    height: 60,
    margin: 10
  },
  itemImageContainer: {
    backgroundColor: "#fffbe6",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#CCCCCC'
  },
  itemTitleText: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "300"
  },
  itemText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "100"
  },
  itemInfoContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
  },
  userView: {
    flex: 4.2,
  }
});

export default ItemsPage;
