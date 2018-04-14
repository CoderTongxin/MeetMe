import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';



export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticated: false,
            user: null
        };
    }


    buttonOnPress()  {
        switch (this.props.type) {
            case 'Login':
                this.login();
                break;
            case 'Sign up':
                this.signup();
                break
        }
    };
    login() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                console.log('login'+loggedInUser.email);
               this.setState({user:loggedInUser})
            })
            .catch(function(error) {
                console.log('fail');
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
        });
    }

    signup() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                console.log('signup'+loggedInUser.email);
                this.setState({user:loggedInUser})
            })
            .catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Email"
                           placeholderTextColor = "#ffffff"
                           selectionColor="#fff"
                           keyboardType="email-address"
                           // onChangeText={(text) => this.setState({email:text})}
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder="Password"
                           secureTextEntry={true}
                           placeholderTextColor = "#ffffff"
                           // onChangeText={(text) => this.setState({password:text})}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.buttonOnPress}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
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