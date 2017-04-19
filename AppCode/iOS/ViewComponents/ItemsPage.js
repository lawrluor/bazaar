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

  componentWillMount() {
    this.getItem()
  }

  render() {
    return (
      <View style={{ flex: 10, marginTop: 20 }}>
        <View style={styles.itemView}>
          <View style={styles.itemImageContainer}>
            <Image 
              style={styles.itemImage}
              source= {require('../../../img/VegetablesAndFruitsIcons/cabbage.png')}
            />
          </View>
        </View>
        <View style={styles.separator}/>
        <View style={styles.userView}>

        </View>
      </View>
    )
  }

  getItem() {
    this.props.firebaseApp.database().ref(this.state._key).once('value').then(function (snapshot) {
      console.log("test", snapshot.val())
      // ...
    });
  //  console.log("Debug", this.state.itemsRef.child(this.state._key).val())
    this.setState({
      item: this.state.itemsRef.child(this.state._key)
    },
      console.log("test", this.state.item))
  }
}

const styles = StyleSheet.create({
  itemView: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
  },
  itemImage: {
    width: 50,
    height: 50,
    margin: 10
  },
  itemImageContainer: {
    backgroundColor: "#fffbe6",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'grey'
  },
  separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#DDDDDD',
	},
  userView: {
    flex: 5,
  }
});

export default ItemsPage;
