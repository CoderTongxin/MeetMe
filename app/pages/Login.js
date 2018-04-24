import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import { Font } from 'expo';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Alert,
    Dimensions
} from 'react-native';
import {firebaseRef} from '../servers/Firebase'
import Loader from '../components/Loader'
import {HomeScreenRoot} from "../config/HomeRouter";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


const BG_IMAGE = require('../images/bg.jpg');

export default class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            user: null,
            fontLoaded: false,
            email: '',
            email_valid: true,
            password: '',
            login_failed: false,
            showLoading: false,
            password_valid:true
        };
        this.login=this.login.bind(this);
    }
    async componentDidMount() {
        // this.checkLoginStatus();
        await Font.loadAsync({
            'georgia': require('../../assets/fonts/Georgia.ttf'),
            'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
            'light': require('../../assets/fonts/Montserrat-Light.ttf'),
            'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
    }


    validateEmail(email) {

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    validatePassword(password) {

        return password.length >= 6;
    }


    checkLoginStatus(){
        firebaseRef.auth().onAuthStateChanged((loggedInUser)=>{
            if(loggedInUser!=null)
                this.props.navigation.navigate('HomeScreenRoot',{
                     user:loggedInUser
                });
        })
    }

    login() {
        this.setState({loading:true});
        firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                this.setState({loading:false});
                this.setState({user:loggedInUser});
                this.props.navigation.navigate('HomeScreenRoot',{
                    user:this.state.user
                });
            })
            .catch(function(error) {
                this.setState({loading:false});
                Alert.alert(error.message)
            }.bind(this));
    }

    async loginWithFacebook() {

        const {type,token} =await Expo.Facebook.
        logInWithReadPermissionsAsync('233859937160350',{permissions:['public_profile']});
        if(type === 'success') {
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=email,gender,age_range`);
                const user_info = await response.json();
                const user_gender=user_info.gender;
                this.setState({showLoading:true});
            const credential= firebaseRef.auth.FacebookAuthProvider.credential(token);
            firebaseRef.auth().signInWithCredential(credential).then((loggedInUser)=>{
                loggedInUser['gender']=user_gender;
                this.setState({showLoading:false});
            }).catch((error)=> {
                Alert.alert(error.message)
            })
        }
    }

    _goToSignUp() {
        this.props.navigation.navigate('Signup');
    }

    render() {

        return(
            <View style={styles.container}>
                <Loader loading={this.state.showLoading}/>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    { this.state.fontLoaded ?
                        <View style={styles.loginView}>
                            <View style={styles.loginTitle}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.travelText}>Meet Me</Text>
                                </View>
                            </View>
                            <View style={styles.loginInput}>
                                <Input
                                    leftIcon={
                                        <Icon
                                            name='user-o'
                                            color='rgba(171, 189, 219, 1)'
                                            size={25}
                                        />
                                    }
                                    containerStyle={{marginVertical: 10}}
                                    onChangeText={(text) => this.setState({email_valid:true, email:text})}
                                    inputStyle={{marginLeft: 10, color: 'white'}}
                                    keyboardAppearance="light"
                                    placeholder="Email"
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    onSubmitEditing={(event) => {
                                        this.setState({email_valid: this.validateEmail(event.nativeEvent.text)});
                                        this.passwordInput.focus();
                                    }}
                                    onBlur={(event)=>{
                                        this.setState({email_valid: this.validateEmail(event.nativeEvent.text)});
                                    }}
                                    placeholderTextColor="white"
                                    errorStyle={{textAlign: 'center', fontSize: 12}}
                                    errorMessage={this.state.email_valid ? null : "Please enter a valid email address"}
                                />
                                <Input
                                    leftIcon={
                                        <Icon
                                            name='lock'
                                            color='rgba(171, 189, 219, 1)'
                                            size={25}
                                        />
                                    }
                                    containerStyle={{marginVertical: 10}}
                                    onChangeText={(text) => this.setState({password_valid:true,password:text})}
                                    inputStyle={{marginLeft: 10, color: 'white'}}
                                    secureTextEntry={true}
                                    keyboardAppearance="light"
                                    placeholder="Password"
                                    returnKeyType="done"
                                    ref={ input => this.passwordInput = input}
                                    onSubmitEditing={(event) => {
                                        this.setState({
                                            password_valid: this.validatePassword(event.nativeEvent.text)});
                                    }}
                                    placeholderTextColor="white"
                                    errorStyle={{textAlign: 'center', fontSize: 12}}
                                    errorMessage={this.state.password_valid ? null : "Password should have at least 6 characters"}
                                />
                            </View>
                            <View style={styles.buttonGroup}>
                                <Button
                                    title='Log in'
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    onPress={() =>this.login()}
                                    loading={this.state.loading}
                                    loadingProps={{size: 'small', color: 'white'}}
                                    disabled={ !this.state.email_valid || this.state.password.length < 6}
                                    containerStyle={{marginVertical: 10}}
                                    buttonStyle={styles.buttonStyle}
                                    titleStyle={styles.buttonTitle}
                                    disabledStyle={styles.disabledButtonStyle}
                                    disabledTitleStyle={styles.disabledTitleStyle}
                                />
                                <Button
                                    icon={
                                        <Icon
                                            name='facebook-square'
                                            size={20}
                                            color='white'
                                        />
                                    }
                                    title='Login with Facebook'
                                    activeOpacity={1}
                                    underlayColor="transparent"
                                    onPress={() =>this.loginWithFacebook()}
                                    loading={this.state.loading}
                                    loadingProps={{size: 'small', color: 'white'}}
                                    buttonStyle={styles.buttonStyle}
                                    titleStyle={styles.buttonTitle}
                                    disabledStyle={styles.disabledButtonStyle}
                                    disabledTitleStyle={styles.disabledTitleStyle}
                                />
                            </View>

                            <View style={styles.footerView}>
                                <Text style={{color: 'grey'}}>
                                    Don't have an account?
                                </Text>
                                <Button
                                    title="Sign up"
                                    clear
                                    activeOpacity={0.5}
                                    titleStyle={{color: 'white', fontSize: 15}}
                                    containerStyle={{marginTop: -10}}
                                    onPress={() => this._goToSignUp()}
                                />
                            </View>
                        </View> :
                        <Text>Loading...</Text>
                    }
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        flex:1,
        marginTop: 100,
        backgroundColor: 'transparent',
        width: 250,
        height: 400,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold'
    },
    plusText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular'
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerView: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGroup:{
        flex: 1,
        marginTop:20
    },
    buttonStyle:{
        height: 50,
        width: 250,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30
    },
    disabledButtonStyle:{
        height: 50,
        width: 250,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 30
    },
    disabledTitleStyle:{
        fontWeight: 'bold',
        color: 'grey'
    },
    buttonTitle: {
        fontWeight: 'bold',
        color: 'white'
    }
})