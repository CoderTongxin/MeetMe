import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import {Button} from 'react-native-elements';
import Logo from '../components/Logo';
import {firebaseRef} from '../servers/Firebase'
import SubmitButton from '../components/SubmitButton';
import Loader from '../components/Loader';
import {styles} from "../common/style/styles";
import {HomeScreenRoot} from "../config/Route";
import {storeUserInfo} from '../common/js/userInfo';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Options = {
    fields: {
        email: {
            placeholder: 'Enter your email here',
            error: 'Email cannot be blank',
            keyboardType: "email-address"
        },
        username: {
            placeholder: 'Enter your username here',
            error: 'Username cannot be blank',
        },
        gender: {
            placeholder: 'Select your gender',
            error: 'Gender cannot be blank'
        },
        password: {
            placeholder: 'Enter your password here',
            error: 'Invalid date',
            password: true,
            secureTextEntry: true
        }
    },
};
const GENDER_OPTIONS = t.enums({female: 'female', male: 'male', other: 'other'});

const UserInfo = t.struct({
    email: t.String,
    username: t.String,
    gender: GENDER_OPTIONS,
    password: t.String
});

export default class signUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            username: '',
            gender: '',
            password: '',
            isAuthenticated: false,
            genders: ['female', 'male', 'other']
        };
        this.signup = this.signup.bind(this);
        this._goBack = this._goBack.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    signup() {
        this.setState({loading: true});
        firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser) => {
                firebaseRef.database().ref('users/' + loggedInUser.uid).set({
                    username: this.state.username,
                    email: this.state.email,
                    gender: this.state.gender,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS505a3eKGNwX5SB6AMA0K7sr4uvozsp5HK8o2Fpqv0IZ4MsEHVrA',
                    uid: loggedInUser.uid
                }).then(() => {
                        this.getUserInfo(loggedInUser.uid)
                    }
                );
            }).catch(function (error) {
            this.setState({loading: false});
            Alert.alert(error.message);
        }.bind(this));
    }

    getUserInfo(userUID) {
        firebaseRef.database().ref('/users/' + userUID).once('value').then(function (user) {
            this.setState({loading: false});
            storeUserInfo(user);
            this.props.navigation.navigate('HomeScreenRoot');
        }.bind(this)).catch((error) => {
            Alert.alert(error.message)
        });
    }

    _goBack() {
        this.props.navigation.navigate('Login');
    }

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    render() {
        return (

                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled={true}>

                        <Loader loading={this.state.loading}/>
                        <Logo/>

                        <Form
                            ref={c => this._form = c}
                            type={UserInfo}
                            options={Options}
                        />

                        <Button
                            title="Submit"
                            onPress={this.handleSubmit}
                        />


                        {/*<View style={styles.inputContainer}>*/}
                        {/*<TextInput style={styles.inputBox}*/}
                        {/*underlineColorAndroid='rgba(0,0,0,0)'*/}
                        {/*placeholder="Email"*/}
                        {/*placeholderTextColor = "#000000"*/}
                        {/*selectionColor="#000"*/}
                        {/*keyboardType="email-address"*/}
                        {/*onChangeText={(text) => this.setState({email:text})}*/}
                        {/*/>*/}
                        {/*<TextInput style={styles.inputBox}*/}
                        {/*underlineColorAndroid='rgba(0,0,0,0)'*/}
                        {/*placeholder="Username"*/}
                        {/*placeholderTextColor = "#000000"*/}
                        {/*selectionColor="#000"*/}
                        {/*onChangeText={(text) => this.setState({username:text})}*/}
                        {/*/>*/}

                        {/*<ModalDropdown style={styles.dropdown}*/}
                        {/*textStyle={styles.dropdown_text}*/}
                        {/*dropdownStyle={styles.dropdown_dropdown}*/}
                        {/*dropdownTextStyle={styles.dropdown_dropdownText}*/}
                        {/*defaultValue='Select gender'*/}
                        {/*options={GENDER_OPTIONS}*/}
                        {/*onSelect={(idx, value) => this.setState({gender:value})}*/}
                        {/*/>*/}
                        {/*<TextInput style={styles.inputBox}*/}
                        {/*underlineColorAndroid='rgba(0,0,0,0)'*/}
                        {/*placeholder="Password"*/}
                        {/*selectionColor="#000"*/}
                        {/*secureTextEntry={true}*/}
                        {/*placeholderTextColor = "#000000"*/}
                        {/*onChangeText={(text) => this.setState({password:text})}*/}
                        {/*/>*/}

                        {/*<SubmitButton onPress={this.signup} type='Sign up'/>*/}
                        {/*</View>*/}
                        <View style={styles.textContent}>
                            <Text style={styles.text}>Already have an account?</Text>
                            <TouchableOpacity onPress={this._goBack}><Text
                                style={styles.textLink}> Login</Text></TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>

        )
    }
}
