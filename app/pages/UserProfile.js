import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import {firebaseRef} from '../servers/Firebase';
import {Actions} from 'react-native-router-flux';

export default class userProfile extends Component {


    goback(){
        Actions.signUp()
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Hello {this.props.user.email}</Text>
                <Button title='back' color="#841584" onPress={this.goback}/>

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