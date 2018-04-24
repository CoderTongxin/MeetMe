import React,{Component}from 'react';
import { StyleSheet,  View } from 'react-native';
import Routes from './app/Routes';
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <Routes/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
