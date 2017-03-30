import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions } from 'react-native';

class ItemsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    console.log(this.state.price)
      return (
        <View style={{flex: 10}}>
          <View style={styles.itemView}>

          </View>
        </View>
      )
  }

}

const styles = StyleSheet.create({
  itemView: {
    flex: 5
  },
  userView: {
    flex: 5
  }
});

export default ItemsPage;
