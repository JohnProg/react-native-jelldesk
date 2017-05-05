import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Linking
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class SearchResult extends Component {

	openUrl = (url) => {
		Linking.openURL(url);
	}

	render() {
		const { resultText, items } = this.props;

		return (
			<View style={ styles.container } >
				<Text style={ styles.titleText } >{resultText}</Text>
				{items && items.length > 0 &&
					<ScrollView>
						<List containerStyle={styles.listContainerStyle}>
						{
							items.map((item, i) => (
								<ListItem
									key={i}
									title={(i + 1) + '. ' + item.title}
									hideChevron={true}
									titleStyle={{color: '#78A300'}}
									containerStyle={{ borderWidth: 0, borderBottomColor: 'transparent', paddingTop:2 }}
									onPress={() => this.openUrl(item.url) }
								/>
							))
						}
						</List>
					</ScrollView>
				}
			</View>
		);
	}
}

SearchResult.propTypes = {
	resultText: React.PropTypes.string.isRequired,
	items: React.PropTypes.array.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		width: '100%',
		height: '100%',
		backgroundColor: '#FAFAFA',
		paddingBottom: 10,
	},
	listContainerStyle: { 
		borderWidth: 0, 
		backgroundColor: 'transparent', 
		borderColor: 'transparent', 
		marginTop: 10 
	},
	titleText: {
		paddingLeft: 15,
		fontWeight: 'bold',
		color: '#212121'
	},
});