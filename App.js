import React from 'react';
import { StyleSheet,  View } from 'react-native';
import {Home} from './app/Home';

console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          {/*<Routes/>*/}
          <Home/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
