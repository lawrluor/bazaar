import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions } from 'react-native';

class ItemsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsRef: this.props.firebaseApp.database().ref(),
      _key: this.props._key,
      item: ''
    }
  }

  componentWillMount(){
    this.getItem()
  }

  render() {
      return (
        <View style={{flex: 10, marginTop: 20}}>
          <View style={styles.itemView}>

          </View>
          <View style={styles.userView}>

          </View>
        </View>
      )
  }

  getItem(){
    console.log("Debug", this.state.itemsRef.child(this.state._key))
    this.setState({
      item: this.state.itemsRef.child(this.state._key)
    },
    console.log("test", this.state.item))
  }
}

const styles = StyleSheet.create({
  itemView: {
    flex: 5,
    borderWidth: 2,
    borderColor: "red"
  },
  userView: {
    flex: 5,
    borderWidth: 2,
    borderColor: "green"
  }
});

export default ItemsPage;
