import React from 'react';
import { StyleSheet,  View } from 'react-native';
import {Root,HomeScreenRoot} from './app/config/Route';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';


console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Root/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
