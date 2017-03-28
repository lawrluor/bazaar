import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions } from 'react-native';

class ItemsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      price: this.props.price,
      quantity: this.props.quantity,
      expDate: this.props.expDate,
      expanded: false
    }
  }


  render() {
    console.log(this.state.price)
    if (!this.state.expanded) {
      return (
        <TouchableHighlight onPress={() => this.expanding()}>
          <View style={styles.tile}>
            <View style={styles.priceView}>
              <Text style={styles.priceText}>
                {this.state.price}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.nameText}>
                {this.state.quantity + ' ' + this.state.name}
              </Text>
              <Text style={styles.expDateText}>
                {this.state.expDate}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )
    }
    else{
      console.log("other view")
      return (
        <TouchableHighlight onPress={() => this.expanding()}>
          <View style={{flex: 2}}>
          <View style={styles.tile}>
            <View style={styles.priceView}>
              <Text style={styles.priceText}>
                {this.state.price}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.nameText}>
                {this.state.quantity + ' ' + this.state.name}
              </Text>
              <Text style={styles.expDateText}>
                {this.state.expDate}
              </Text>
            </View>
          </View>
          <View style={{flex:1, backgroundColor:'blue'}}/>
          </View>
        </TouchableHighlight>
      )
    }
  }

  expanding() {
    if (this.state.expanded) {
      this.setState({
        expanded: false
      })
    }
    else {
      this.setState({
        expanded: true
      })
    }
  }
}


const styles = StyleSheet.create({
  tile: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 5
  },
  priceView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '200'
  },
  expDateText: {
    fontSize: 15,
    marginBottom: 5
  },
  nameText: {
    fontSize: 20,
    fontWeight: '200',
    marginTop: 5,
    marginBottom: 5
  },
  textView: {
    flex: 0.8,
    flexDirection: 'column'
  },
  distance: {
    flex: 0.2
  }
});

export default ItemsRow;