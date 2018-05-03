import React from 'react';

import {StyleSheet, View, Text} from 'react-native';


export default class Notice extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Do not have any activities!</Text>
                <Text style={styles.text}>Create or Join an activity!</Text>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    text:{
        marginVertical:5,
        justifyContent:'center',
    }
})