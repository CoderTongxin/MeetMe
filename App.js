import React,{Component}from 'react';
import { StyleSheet,  View } from 'react-native';
import Routes from './app/Routes';
import {Root} from './app/config/HomeRouter';

console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Routes/>
          {/*<Root/>*/}
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
