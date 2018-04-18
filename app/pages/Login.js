import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import {firebaseRef} from '../servers/Firebase'
import Logo from '../components/Logo';
import SubmitButton from '../components/SubmitButton';
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
        this.login=this.login.bind(this)
    }
    login() {
        firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                this.setState({user:loggedInUser});
                Actions.userProfile({user: this.state.user})
            })
            .catch(function(error) {
                Alert.alert(error.message)
            });
    }

    _goToSignUp() {
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
                    <SubmitButton onPress={()=> this.login()} type='Login'/>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.text}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={this._goToSignUp}><Text style={styles.textLInk}> Signup</Text></TouchableOpacity>
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
    textContent : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    text: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    textLInk: {
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
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    }
});