import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class Logo extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.title}>
                <Text style={styles.travelText}>Seya</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: '#2E3347',
        fontSize: 30,
        fontWeight:'bold'
    },
});