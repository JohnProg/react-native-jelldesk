import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Picker,
	KeyboardAvoidingView,
	Keyboard,
	ScrollView
} from 'react-native';
import { 
	Button, 
	FormLabel, 
	FormInput,
	FormValidationMessage
} from 'react-native-elements';
import { 
	api, 
	apiPost, 
	apiAuthQueryString, 
	httpRequest 
} from './ApiUtils';

import FeedbackHelper from './FeedbackHelper';
import FileUpload from './FileUpload'
import { apiConfig, getAppConfig } from './config';

export default class FeedbackView extends Component {
	constructor() {
		super();
		this.state = {
			isProccessing: false,
			requestTypeId: '',
			fullname: '',
			email: '',
			summary: '',
			errorMsg: '',
			requestItems: [],
			files: []
		};
		this.feedbackHelper = new FeedbackHelper();
		this.keyboardDidShow = this.keyboardDidShow.bind(this);
		this.keyboardDidHide = this.keyboardDidHide.bind(this);
		this.removeFile = this.removeFile.bind(this);
		this.addFile = this.addFile.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		const errorMsg = this.feedbackHelper.validateForm(this.state);
		this.setState({errorMsg: errorMsg});
		if (!errorMsg) {
			this.setState({ isProccessing: true });
			const reqUrl = `${apiConfig.apiEnpoint}/tickets/create-request`;
			apiPost(reqUrl, this.feedbackHelper.getPayload(apiConfig.token, this.state))
				.then(json => this.uploadFiles(json));
		}
	}

	uploadFiles(json) {
		const {files, requestTypeId, requestItems} = this.state;
		if (json && json.issueKey && files.length > 0) {
			//starting uploading files
			const serverURL = `${apiConfig.apiEnpoint}/tickets/upload`;

			files.map(photo => {
				let uploadPayload = this.feedbackHelper.getUploadPayload(apiConfig.token, json.issueKey, requestTypeId, requestItems);
				uploadPayload.append('file', photo);
				//console.log('send upload', uploadPayload);

				httpRequest('POST', serverURL, uploadPayload, function(success, result) {
					if (success) {
						//console.log('hi------it done');
					}
				});
			})
		}

		this.informResult(json);
	}

	removeFile(name) {
		let { files } = this.state;
		const nameRemoved = files.filter(function(el) {
			return el.name !== name;
		});
		this.setState({ files: nameRemoved });
	}

	addFile(files) {
		this.setState({ files: files });
	}

	informResult(result) {
		if(result && result.issueId) {
			this.feedbackHelper.showShortAlert('Your request is sent sucessfully!');
			//clear form
			this.setState({ 
				summary: '',
				fullname: '',
				email: '', 
				files: [],
				isProccessing: false
			});
		} else {
			this.feedbackHelper.showLongAlert('Failed to save this request, please try again later!');
		}
	}

	keyboardDidShow () {
		this.props.hideTabBar(true);
	}

	keyboardDidHide () {
		this.props.hideTabBar(false);
	}

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}

	componentWillUnmount () {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	componentDidMount() {
		const url = `${apiConfig.apiEnpoint}/tickets/request-types?${apiAuthQueryString(apiConfig.token, apiConfig.projectKey)}`;
		api(url)
			.then(json => {
				const requestTypes = this.feedbackHelper.transformResults(json.values);
				this.setState({ 
					requestItems: requestTypes, 
					requestTypeId: (requestTypes.length > 0) ? requestTypes[0].value : '' 
				});
		});
	}

	render() {
		const { requestItems, requestTypeId, files, isProccessing, fullname, email, summary } = this.state;

		return (
			<ScrollView>
				<KeyboardAvoidingView style={styles.container} >
					<FormLabel labelStyle={styles.labelStyle}>{getAppConfig().ticket.ticketRequestTypeLabel} (*)</FormLabel>
					<Picker
						selectedValue={requestTypeId}
						onValueChange={(reqType) => this.setState({requestTypeId: reqType})}
						style={{marginLeft: 10, color: '#757575'}} >
						{
							requestItems.map(item => (
								<Picker.Item key={item.value} label={item.label} value={item.value} />
							))
						}
					</Picker>

					<FormLabel labelStyle={styles.labelStyle}>{getAppConfig().ticket.ticketYourNameLabel} (*)</FormLabel>
					<FormInput
						inputStyle={styles.inputStyle}
						value={fullname}
						onChangeText={(text) => this.setState({fullname: text})}
					/>
					<FormLabel labelStyle={styles.labelStyle}>{getAppConfig().ticket.ticketEmailAddressLabel} (*)</FormLabel>
					<FormInput
						inputStyle={styles.inputStyle}
						keyboardType="email-address"
						onChangeText={(text) => this.setState({email: text})}
						value={email}
						onSubmitEditing={() => {
							if (!this.feedbackHelper.validateEmail(this.state.email)) {
								alert('Email invalid!')
							}
						}}
					/>
					<FormLabel labelStyle={styles.labelStyle}>{getAppConfig().ticket.ticketDescriptionLabel}</FormLabel>
					<FormInput
						multiline={true}
						numberOfLines = {4}
						value={summary}
						inputStyle={[styles.inputStyle, {height: 70}]}
						onChangeText={(text) => this.setState({summary: text})}
					/>
					<FormValidationMessage>{this.state.errorMsg}</FormValidationMessage>

					<FormLabel labelStyle={styles.labelStyle}>{getAppConfig().ticket.ticketAttachmentLabel}</FormLabel>
					<FileUpload 
						feedbackHelper={this.feedbackHelper} 
						removeFile={this.removeFile}
						addFile={this.addFile}
						files={files} />

					<View style={{paddingTop: 10}}>
						<Button
							raised
							disabled={isProccessing}
							icon={{name: 'send'}}
							textStyle={{fontSize: 16}}
							buttonStyle={{ marginBottom: 40 }}
							title= {getAppConfig().ticket.ticketSendLabel}
							onPress={() => this.onSubmit()} />
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

FeedbackView.propTypes = {
	hideTabBar: React.PropTypes.func
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	labelStyle: {
		fontSize: 13,
	},
	inputStyle: {
		width: '100%',
		borderWidth: 1,
		borderRadius: 3,
		borderColor: '#9E9E9E'
	}
});