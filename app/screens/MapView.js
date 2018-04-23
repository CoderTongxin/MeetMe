import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Map from '../components/Map'

export default class Schedule extends React.Component {
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
    },
});