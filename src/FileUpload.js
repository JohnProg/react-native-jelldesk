import React, { Component } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import SelectedFileBox from './SelectedFileBox';
import { getAppConfig } from './config';
import * as mime from 'react-native-mime-types';

export default class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.openFilePicker = this.openFilePicker.bind(this);
	}

	openFilePicker() {
		if (Platform.OS === 'android') {
			FilePickerManager.showFilePicker(null, (response) => {
				//console.log('Response = ', response);
				if (!response.didCancel && !response.error) {
					let { files } = this.props;

					const maxAllow = parseInt(getAppConfig().ticket.ticketAttachmentMaxQueue);
					if (files.length >= maxAllow) {
						this.props.feedbackHelper.showLongAlert("You've already reached maxium files");
					} else {
						const fileName = response.path.substring(response.path.lastIndexOf('/') + 1);
						const type = mime.lookup(fileName);

						files.push({
							name: response.path.substring(response.path.lastIndexOf('/') + 1),
							uri: response.uri,
							type: type
						});
						//update files from parent
						this.props.addFile(files);
					}
				}
			});
		} else {
			alert('File picker is not supported in ios, we are working on it and update soon!');
		}
	}

	render() {
		const { files } = this.props;

		return (
			<View style={styles.container}>
				{files && 
					files.map(item => (
						<SelectedFileBox key={item.name} fileName={item.name} removeFile={this.props.removeFile} />
					))
				}

				<TouchableOpacity style={styles.attachmentContainer} onPress={() => this.openFilePicker()} >
					<Icon
						name='attach-file' 
						color='#f04c5d' />
					<Text>Attach file</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

FileUpload.propTypes = {
	files: React.PropTypes.array.isRequired,
	removeFile: React.PropTypes.func,
	addFile: React.PropTypes.func,
	feedbackHelper: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
	container: {
		width: '90%',
		alignSelf: 'center',
		paddingTop: 5,
	},
	attachmentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#BDBDBD',
		borderWidth: 2,
		borderStyle: 'dashed',
		flexDirection: 'row',
		paddingTop: 8,
		paddingBottom: 8
	}
});