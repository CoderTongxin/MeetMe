import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HomeScreenRoot} from '../config/HomeRouter';


export default class MainMenu extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HomeScreenRoot/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
});