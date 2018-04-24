import React from 'react';
import {StyleSheet, View} from 'react-native';
import Map from '../components/Map'

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