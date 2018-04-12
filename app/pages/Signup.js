import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo/Logo';
import Form from '../components/Form/Form';

import {Actions} from 'react-native-router-flux';

export default class signUp extends Component<{}> {

    static goBack() {
        Actions.pop();
    }

    render() {
        return(
            <View style={styles.container}>
                <Logo/>
                <Form type="Sign up"/>
                <View style={styles.signUpTextCont}>
                    <Text style={styles.signUpText}>Already have an account?</Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signUpButton}> Login</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'#455a64',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    signUpTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signUpText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signUpButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    }
});