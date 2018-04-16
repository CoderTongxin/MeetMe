import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {firebaseRef} from '../servers/Firebase'

export default class userProfile extends Component<{}> {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Hello {this.props.user.email}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    }
})