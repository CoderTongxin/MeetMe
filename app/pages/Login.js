import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {firebaseRef} from '../servers/Firebase'

import Logo from '../components/Logo/Logo';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticated: false,
            user: null
        };
    }
    login() {
        firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                console.log('login'+loggedInUser.email);
                this.setState({user:loggedInUser});
                Actions.userProfile()
            })
            .catch(function(error) {
                console.log('fail');
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // ...
            });
    }

    goToSignUp() {
        Actions.signUp()
    }

    render() {
        return(
            <View style={styles.container}>
                <Logo/>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Email"
                               placeholderTextColor = "#ffffff"
                               selectionColor="#fff"
                               keyboardType="email-address"
                        onChangeText={(text) => this.setState({email:text})}
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Password"
                               secureTextEntry={true}
                               placeholderTextColor = "#ffffff"
                        onChangeText={(text) => this.setState({password:text})}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => this.login}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpTextCont}>
                    <Text style={styles.signUpText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={this.goToSignUp}><Text style={styles.signUpButton}>Sign up</Text></TouchableOpacity>
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
    },
    inputContainer : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },

    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }
});