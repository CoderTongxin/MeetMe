import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {
    Button,
} from 'react-native-elements';


import {firebaseRef} from "../servers/Firebase";


export default class Notice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            activity: null,
            showDetail: false
        };
    }

    initiateActivity() {

    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Do not have any activities</Text>
                <Text>Click initiate to create a new activity!</Text>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})