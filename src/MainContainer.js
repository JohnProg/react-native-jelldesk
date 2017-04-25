import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Tabs, Tab, Icon } from 'react-native-elements';
import SearchView from './SearchView';
import FeedbackView from './FeedbackView';
import { getAppConfig } from './config';

export default class MainContainer extends Component {
	constructor() {
		super();
		this.state = {
			selectedTab: 'help',
			hideTabBar: false
		};
		this.hideTabBar = this.hideTabBar.bind(this);
	}

	changeTab (selectedTab) {
		this.setState({selectedTab})
	}

	hideTabBar(value) {
		this.setState({ hideTabBar: value });
	}

	render() {
		const { selectedTab } = this.state;

		let tabBarStyle = styles.tabBarStyle;
		let sceneStyle = {};
		if (this.state.hideTabBar) {
			tabBarStyle = styles.hiddenTabBarStyle;
			sceneStyle.paddingBottom = 0;
		}

		return (
			<Tabs hidesTabTouch tabBarStyle={tabBarStyle} sceneStyle={sceneStyle}>
				{ getAppConfig().searchBoxEnabled &&
					<Tab
						title= {getAppConfig().helpCenter.searchTitle}
						titleStyle={styles.titleStyle}
						selectedTitleStyle={styles.selectedTitleStyle}
						selected={selectedTab === 'help'}
						renderIcon={() => <Icon containerStyle={styles.iconStyle} color={'#5e6977'} name='help' size={30} />}
						renderSelectedIcon={() => <Icon color={'#03A9F4'} name='help' size={35} />}
						onPress={() => this.changeTab('help')}>
						<SearchView hideTabBar={this.hideTabBar} />
					</Tab>
				}
				
				{ getAppConfig().ticketBoxEnabled &&
					<Tab
						selectedTitleStyle={styles.selectedTitleStyle}
						title= {getAppConfig().ticket.ticketTitle}
						titleStyle={styles.titleStyle}
						selected={selectedTab === 'message'}
						renderIcon={() => <Icon containerStyle={styles.iconStyle} color={'#5e6977'} name='message' size={30} />}
						renderSelectedIcon={() => <Icon color={'#03A9F4'} name='message' size={35} />}
						onPress={() => this.changeTab('message')}>
						<FeedbackView hideTabBar={this.hideTabBar} />
					</Tab>
				}
				
				<Tab
					selectedTitleStyle={styles.selectedTitleStyle}
					title='Close'
					titleStyle={styles.titleStyle}
					renderIcon={() => <Icon containerStyle={styles.iconStyle} color={'#5e6977'} name='close' size={30} />}
					renderSelectedIcon={() => <Icon color={'#03A9F4'} name='close' size={35} />}
					onPress={() => this.props.hideDialog()}>
				</Tab>
			</Tabs>
		);
	}
}

MainContainer.propTypes = {
	hideDialog: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	tabBarStyle: {
		height: 65, 
		justifyContent: 'center', 
		alignItems: 'center',
		paddingBottom: 5
	},
	hiddenTabBarStyle: {
		height: 0,
		overflow: 'hidden'
	},
	titleStyle: {
		fontWeight: 'bold', 
		fontSize: 12,
		marginBottom: 3,
	},
	selectedTitleStyle: {
		marginTop: -1, 
		marginBottom: 3,
		color: '#03A9F4'
	},
	iconStyle: {
		justifyContent: 'center', 
		alignItems: 'center', 
		marginTop: 12
	},
});