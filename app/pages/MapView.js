import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import Map from '../components/Map'
import Header from "react-native-elements/src/header/Header";

export default class MapView extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Map/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});