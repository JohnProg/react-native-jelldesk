import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal
} from 'react-native';
import { Icon } from 'react-native-elements';
import MainContainer from './MainContainer';
import { apiConfig, getAppConfig, updateAppConfig } from './config';
import { api, apiAuthQueryString } from './ApiUtils';

export default class JelldeskBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      configLoaded: false
    }

    apiConfig.token = this.props.token;
    apiConfig.projectKey = this.props.projectKey;
  }
  
  hideDialog = () => {
    this.setState({modalVisible: false});
  }

  showDialog = () => {
    this.setState({modalVisible: true});
  }

  componentDidMount() {
    //get theme configuration from server
    const url = `${apiConfig.apiEnpoint}/config?${apiAuthQueryString(apiConfig.token, apiConfig.projectKey)}`;
    api(url)
      .then(json => {
        updateAppConfig(json);
        this.setState({ configLoaded: true });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <View style={styles.container} >
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible} >
          <MainContainer hideDialog={this.hideDialog} />
        </Modal>

        <Icon
          onPress={() => this.showDialog() }
          reverse
          name='help-outline'
          color={getAppConfig().themeColor}
        />
      </View>
    );
  }
}

JelldeskBox.propTypes = {
  token: React.PropTypes.string.isRequired,
  projectKey: React.PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 1000
  }
});