import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchResult from './SearchResult';
import { api, apiAuthQueryString } from './ApiUtils';
import { apiConfig, getAppConfig } from './config';

export default class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoadingIcon: false,
      keyword: '',
      results: []
    };

    this.search = this.search.bind(this);
    this.getSearchResultText = this.getSearchResultText.bind(this);
    this.keyboardDidShow = this.keyboardDidShow.bind(this);
    this.keyboardDidHide = this.keyboardDidHide.bind(this);
  }

  search(text) {
    if (text) {
      const queryParams = `${apiAuthQueryString(apiConfig.token, apiConfig.projectKey)}&query=${text}`;
      api(`${apiConfig.apiEnpoint}/help-center/search?${queryParams}`)
        .then(json => this.setState({ keyword: text, showLoadingIcon: false, results: this.transformResults(json) }));
    }
  }

  transformResults(jsonResult) {
    let results = [];
    if (jsonResult && jsonResult.results) {
      const baseUrl = jsonResult._links.base;
      jsonResult.results.forEach(item => {
        results.push({
          title: item.title,
          url: `${baseUrl}${item._links.webui}`
        });
      });
    }
    return results;
  }

  getSearchResultText() {
    const { keyword, results } = this.state;
    let label = '';
    if (keyword) {
      if (!results || results.length == 0) {
        label = getAppConfig().helpCenter.searchEmptyMessage.replace('${query}', `"${keyword}"`);
      } else {
        label = getAppConfig().helpCenter.searchResultLabel;
      }
    }
    return label;
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

  render() {
    const { showLoadingIcon, results } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar 
          textInputRef="search"
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          showLoadingIcon={showLoadingIcon}
          clearIcon
          onSubmitEditing={(event) => {
            this.setState({ showLoadingIcon: true })
            this.search(event.nativeEvent.text);
          }}
          placeholder={getAppConfig().helpCenter.searchPlaceholder} />
        <SearchResult resultText={this.getSearchResultText()} items={ results } />
      </View>
    );
  }
}

SearchView.propTypes = {
  hideTabBar: React.PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    borderColor: '#9E9E9E',
    borderWidth: 1
  },
  searchContainer: {
    borderBottomWidth: 1,
    width: '100%'
  }
});