import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import Button from 'react-native-button';


class NavigationBar extends Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.user){
      return(
        <View style={styles.container}>
          <View style={styles.containerButton}>
            <Button  onPress={this.props.navigateMain}>
              <Image style={this.props.page[0] ? styles.iconsSubmenuSelected : styles.iconsSubmenu} source={require('../../img/home.png')}/>
            </Button>
          </View>
          <View style={styles.containerButton}>
            <Button onPress={this.props.navigateItem}>
              <Image style={this.props.page[1] ? styles.iconsSubmenuSelected : styles.iconsSubmenu} source={require('../../img/List.png')}/>
            </Button>
          </View>
          <View style={styles.containerButton}>
            <Button>
              <Image style={this.props.page[2] ? styles.iconsSubmenuSelected : styles.iconsSubmenu} source={require('../../img/user.png')}/>
            </Button>
          </View>
        </View>
      );
    }
    if(!this.props.user){
      return(<View style={styles.container}></View>);
    }
  }
};

const styles = StyleSheet.create({
  container: {
    width: 377,
    flex: 0.08,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderWidth: 0.5,
    borderColor: '#AAAAAA',
  },
  containerButton: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsSubmenu: {
    width: 35,
    height: 35,
    tintColor: '#646464',
  },
  iconsSubmenuSelected: {
    width: 35,
    height: 35,
    tintColor: '#C6492D',
  }

});

export default NavigationBar;
