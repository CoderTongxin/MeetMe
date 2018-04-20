import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import {firebaseRef} from '../servers/Firebase'
import Logo from '../components/Logo';
import Loader from '../components/Loader';
import SubmitButton from '../components/SubmitButton';
import {Actions} from 'react-native-router-flux';
import {styles} from "../const/styles";

export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            email: '',
            password: '',
            isAuthenticated: false,
            user: null
        };
        this.login=this.login.bind(this);
        console.disableYellowBox = true;
    }
    login() {
        this.setState({loading:true});
        firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                this.setState({loading:false});
                this.setState({user:loggedInUser});
                Actions.home({user: this.state.user})
            })
            .catch(function(error) {
                this.setState({loading:false});
                Alert.alert(error.message)
            }.bind(this));
    }

    _goToSignUp() {
        Actions.signUp()
    }

    render() {
        return(
            <View style={styles.container}>
                <Loader loading={this.state.loading}/>
                <Logo/>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Email"
                               placeholderTextColor = "#000000"
                               selectionColor="#000"
                               keyboardType="email-address"
                        onChangeText={(text) => this.setState({email:text})}
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               selectionColor="#000"
                               placeholder="Password"
                               secureTextEntry={true}
                               placeholderTextColor = "#000000"
                        onChangeText={(text) => this.setState({password:text})}
                    />
                    <SubmitButton onPress={()=> this.login()} type='Login'/>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.text}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={this._goToSignUp}><Text style={styles.textLink}>  Signup</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}