import React, { Component } from 'react';
import {
    StyleSheet,
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

export default class signUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            email: '',
            password: '',
            isAuthenticated: false,
            user: null
        };
        this.signup=this.signup.bind(this);
    }
    signup() {
        this.setState({loading:true});
        firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                this.setState({loading:false});
                this.setState({user:loggedInUser});
                Actions.userProfile({user: this.state.user});
            })
            .catch(function(error) {
                this.setState({loading:false});
                Alert.alert(error.message);
            }.bind(this));
    }

    _goBack() {
        Actions.pop();
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
                               placeholderTextColor = "#ffffff"
                               selectionColor="#fff"
                               keyboardType="email-address"
                               onChangeText={(text) => this.setState({email:text})}
                               value={this.state.email}
                    />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Password"
                               secureTextEntry={true}
                               placeholderTextColor = "#ffffff"
                               value={this.state.password}
                               onChangeText={(text) => this.setState({password:text})}
                    />
                    <SubmitButton onPress={() => this.signup()} type='Sign up'/>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <TouchableOpacity onPress={this._goBack}><Text style={styles.textLInk}> Login</Text></TouchableOpacity>
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
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    }

});