import React from 'react';
import { StyleSheet,  View } from 'react-native';
import {Root,HomeScreenRoot} from './app/config/Route';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider,connect } from 'react-redux';
import logger from 'redux-logger';


const user = {
            username: 'gin',
            gender: 'female',
            avatar: '',
            email: 'gingin@gmail.com',
            uid:123456

};
const userReducer = function(state=user, action) {
    return state;
};
const store = createStore(userReducer);

function mapStateToProps(state){
    return {
        user:state.name,
    }
}
function mapDispatchToProps(dispatch){
    return null;
}

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
