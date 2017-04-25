
export const apiConfig = {
	apiEnpoint: 'https://jelldesk-app.herokuapp.com/api/1/embeddables',
	token: '',
	projectKey: '',
};

const defaultConfig = {
	ticketBoxEnabled: true,
	ticket: {
		ticketTitle: "Leave us a message",
		ticketYourNameLabel: "Your name",
		ticketRequestTypeLabel: "Request type",
		ticketEmailAddressLabel: "Email address",
		ticketDescriptionLabel: "Description",
		ticketAttachmentLabel: "Attachments",
		ticketAttachmentPlaceholder: "Add file or drop here",
		ticketAttachmentMaxQueue: 3,
		ticketCancelLabel: "Cancel",
		ticketSendLabel: "Send"
	},
	searchBoxEnabled: true,
	helpCenter: {
		searchTitle: "Help",
		searchPlaceholder: "How can we help?",
		searchEmptyMessage: "There are no results for ${query}.Try searching for something else.",
		searchResultLabel: "Top results",
		searchLeaveMessageLabel: "Leave us a message"
	},
	chatBoxEnabled: true,
	themeColor: "#EF5350",
	gaTrackingCode: "",
	showLogo: true,
};

let appConfig = null;

export const updateAppConfig = (newConfig) => {
	appConfig = Object.assign({}, defaultConfig, newConfig);
}

export const getAppConfig = () => {
	return (appConfig) ? appConfig : defaultConfig;
}