// Items dis[play page

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, ListView } from 'react-native';
import ItemsRow from './ViewComponents/ItemsRow.js'

class Items extends Component {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			itemsRef: this.props.firebaseApp.database().ref(),
			dataSource: ds.cloneWithRows([]),
			itemsFirebase: []
		};
	}

	componentWillMount() {
		this.listenForItems(this.state.itemsRef)
	}

	render() {
		console.log("stateitems", this.state.itemsFirebase)
		return (
			<View style={{ flex: 10 }}>
				<View style={styles.navigatorTop}>
					<Text style={{ fontSize: 18 }}>
						{'Items View'}
					</Text>
				</View>
				<View style={styles.separatorHorizontal} />
				<View style={{ flex: 9.2, backgroundColor:'#960819' }}>
					<ListView
						enableEmptySections={true}
						key={this.state.dataSource}
						dataSource={this.state.dataSource}
						renderRow={(itemsFirebase) => <ItemsRow navigator={this.props.navigator} {...itemsFirebase} />}
					/>
				</View>
			</View>
		);
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
	separator: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: 'grey',

	}
});


export default Items