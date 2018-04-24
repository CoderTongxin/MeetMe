import React  from 'react';
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
import ModalDropdown from 'react-native-modal-dropdown'
import {styles} from "../const/styles";
const GENDER_OPTIONS = ['female', 'male', 'other'];
export default class signUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            email: '',
            username:'',
            gender:'',
            password: '',
            isAuthenticated: false,
            genders:['female','male','other']
        };
        this.signup=this.signup.bind(this);
        this._goBack=this._goBack.bind(this)
    }
    signup() {
        this.setState({loading:true});
        firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                    firebaseRef.database().ref('users/' + loggedInUser.uid).set({
                        username: this.state.username,
                        email: this.state.email,
                        gender:this.state.gender,
                        avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS505a3eKGNwX5SB6AMA0K7sr4uvozsp5HK8o2Fpqv0IZ4MsEHVrA'
                    }).then( ()=>{
                        let user= {id:loggedInUser.uid, avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS505a3eKGNwX5SB6AMA0K7sr4uvozsp5HK8o2Fpqv0IZ4MsEHVrA',
                            email:this.state.email, username:this.state.username,gender:this.state.gender};
                        this.setState({loading:false});
                        this.props.navigation.navigate('userProfile',{
                            user:user
                        });
                        }
                    );
            }).catch(function(error) {
                this.setState({loading:false});
                Alert.alert(error.message);
            }.bind(this));
    }

    _goBack() {
        this.props.navigation.navigate('login');
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

                    <ModalDropdown style={styles.dropdown}
                                   textStyle={styles.dropdown_text}
                                   dropdownStyle={styles.dropdown_dropdown}
                                   dropdownTextStyle={styles.dropdown_dropdownText}
                                   defaultValue='Select gender'
                                   options={GENDER_OPTIONS}
                                   onSelect={(idx, value) => this.setState({gender:value})}
                        />
                    <TextInput style={styles.inputBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Password"
                               selectionColor="#000"
                               secureTextEntry={true}
                               placeholderTextColor = "#000000"
                               onChangeText={(text) => this.setState({password:text})}
                    />

                    <SubmitButton onPress={this.signup} type='Sign up'/>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <TouchableOpacity onPress={this._goBack}><Text style={styles.textLink}> Login</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}
