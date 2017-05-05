import { 
	ToastAndroid,
	Platform
} from 'react-native';

export default class FeedbackHelper {
	isValueEmpty(value) {
		if (!value) {
			return true;
		}
		return false;
	}

	validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	validateForm(formState) {
		const { requestTypeId, email, fullname } = formState;
		let errorMsg = '';

		if (this.isValueEmpty(requestTypeId)) {
			errorMsg = 'Required fields cannot be blank';
		}
		if (this.isValueEmpty(fullname)) {
			errorMsg = 'Required fields cannot be blank';
		}
		//validate email
		if (!this.validateEmail(email)) {
			errorMsg += ' and email is invalid.';
		}
		return errorMsg;
	}

	transformResults(jsonResult) {
		let results = [];
		if (jsonResult) {
			jsonResult.forEach(item => {
				results.push({
					label: item.name,
					key: item.id,
					serviceDeskId: item.serviceDeskId
				});
			});
		}
		return results;
	}

	getPayload(jellToken, formState) {
		const { requestTypeId, email, fullname, summary, requestItems } = formState;

		const foundItem = requestItems.find((item) => {
			return item.value === requestTypeId;
		});

		return {
			requestTypeId,
			email,
			fullname,
			summary,
			jellToken,
			serviceDeskId: (foundItem) ? foundItem.serviceDeskId : ''
		};
	}

	getUploadPayload(jellToken, issueKey, requestTypeId, requestItems) {
		const foundItem = requestItems.find((item) => {
			return item.value === requestTypeId;
		});

		let body = new FormData();
		body.append('jellToken', jellToken);
		body.append('serviceDeskId', (foundItem) ? foundItem.serviceDeskId : '');
		body.append('issueKey', issueKey);
		return body;
	}

	showShortAlert(msg) {
		this.showAlert(msg, true);
	}

	showLongAlert(msg) {
		this.showAlert(msg, false);
	}

	showAlert(msg, isShort) {
		if (Platform.OS === 'android') {
			ToastAndroid.show(msg, (isShort) ? ToastAndroid.SHORT : ToastAndroid.LONG);
		} else {
			alert(msg);
		}
	}
}