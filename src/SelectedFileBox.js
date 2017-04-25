import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class SelectedFileBox extends Component {
	render() {
		const {fileName} = this.props;
		return (
			<View style={styles.container} >
				<View style={styles.group} >
					<Icon
						name='file-upload' 
						color='#26C6DA' />
					<Text numberOfLines={1}>{fileName}</Text>
				</View>
				<Icon
					name='close'
					color='#757575'
					onPress={() => this.props.removeFile(fileName)} />
			</View>
		);
	}
}

SelectedFileBox.propTypes = {
	fileName: React.PropTypes.string.isRequired,
	removeFile: React.PropTypes.func
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderColor: '#BDBDBD',
		borderWidth: 1,
		backgroundColor: '#EEEEEE',
		height: 40,
		borderRadius: 3,
		marginBottom: 8
	},
	group: {
		flexDirection: 'row',
		marginLeft: 5
	}

});