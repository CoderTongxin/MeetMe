import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Root} from '../config/HomeRouter';


export default class MainMenu extends React.Component {
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
        justifyContent:'center',
        alignItems:'center'
    },
});