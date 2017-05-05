
function checkStatus(response) {
	if(response.status >= 200 && response.status < 300) {
		return response;
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

function api(url) {
	return fetch(url)
		.then(checkStatus)
		.then(response => response.json())
		.then(json => json)
		.catch(e => e);
}

function apiPost(url, payload, config = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
}) {
	const formData = Object.assign({}, config, {
		body: JSON.stringify(payload)
	});
	//console.log('formData', formData);

	return fetch(url, formData)
		.then(response => response.json())
		.then(json => json)
		.catch(e => e);
}

function apiAuthQueryString(token, prjKey) {
	return `jellToken=${token}&projectKey=${prjKey}`;
}

function httpRequest(method, url, payload, callback) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			//console.log('success', request.responseText);
			callback(true, request.responseText);
		} else {
			//console.warn('error', request._response);
			callback(false, request._response);
		}
	};

	request.open(method, url);
	if (payload) {
		request.send(payload);
	} else {
		request.send();
	}
}

export {
	api,
	apiPost,
	apiAuthQueryString,
	httpRequest
}