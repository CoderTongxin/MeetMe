import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import Logo from '../components/Logo';
import {firebaseRef} from '../servers/Firebase'
import SubmitButton from '../components/SubmitButton';
import Loader from '../components/Loader';
import {Actions} from 'react-native-router-flux';
import {styles} from "../const/styles";

export default class signUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            email: '',
            username:'',
            gender:'',
            age: '',
            password: '',
            isAuthenticated: false,
        };
        this.signup=this.signup.bind(this);
    }
    signup() {
        this.setState({loading:true});
        firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                    firebaseRef.database().ref('users/' + loggedInUser.uid).set({
                        username: this.state.username,
                        email: this.state.email,
                        gender:this.state.gender,
                        age:this.state.age
                    }).then( ()=>{
                        let user= {id:loggedInUser.uid, email:this.state.email, username:this.state.username,gender:this.state.gender,age:this.state.age};
                        this.setState({loading:false});
                        Actions.userProfile({user: user});
                        }
                    );

            })
            .catch(function(error) {
                this.setState({loading:false});
                Alert.alert(error.message);
            }.bind(this));
    }

    _goBack() {
        Actions.login();
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
                               placeholder="Username"
                               placeholderTextColor = "#000000"
                               selectionColor="#000"
                               onChangeText={(text) => this.setState({username:text})}
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Age"
                               placeholderTextColor = "#000000"
                               selectionColor="#000"
                               onChangeText={(text) => this.setState({age:text})}
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Gender"
                               placeholderTextColor = "#000000"
                               selectionColor="#000"
                               onChangeText={(text) => this.setState({gender:text})}
                    />

                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Password"
                               selectionColor="#000"
                               secureTextEntry={true}
                               placeholderTextColor = "#000000"
                               onChangeText={(text) => this.setState({password:text})}
                    />
                    <SubmitButton onPress={() => this.signup()} type='Sign up'/>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <TouchableOpacity onPress={this._goBack}><Text style={styles.textLink}> Login</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
