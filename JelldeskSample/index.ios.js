/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { JelldeskBox } from 'react-native-jelldesk';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJGSiIsInFzaCI6Imh0dHBzOlwvXC9qc29mdGNvbm5lY3Rvci5hdGxhc3NpYW4ubmV0IiwiaXNzIjoiamlyYTowODE5Mzk3Yy04ZjI5LTQ5Y2MtYjcxNi0wNTU1ZDdhMDIxNzAiLCJleHAiOjE0OTE4ODM5NTYsImlhdCI6MTQ5MTg4Mzc3Nn0.quT6F2gDYiIrKtxWZxzUmO2g4OZSTNOexQm3rTzkYyA';
const projectkey = 'FJ';

export default class JelldeskSample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
		
		<JelldeskBox token={token} projectKey={projectkey} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('JelldeskSample', () => JelldeskSample);
