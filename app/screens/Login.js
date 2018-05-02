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
    Dimensions,
} from 'react-native';
import {firebaseRef} from '../servers/Firebase'
import Loader from '../components/Loader'
import {HomeScreenRoot} from "../config/Route";
import {storeUserInfo} from '../common/js/userInfo'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../resource/images/bg.jpg');

export default class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
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
        this.loginWithFacebook=this.loginWithFacebook.bind(this);
        this.getUserInfo=this.getUserInfo.bind(this)
    }
    async componentDidMount() {
        await Font.loadAsync({
            'georgia': require('../../assets/fonts/Georgia.ttf'),
            'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
            'light': require('../../assets/fonts/Montserrat-Light.ttf'),
            'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
        this.checkLogin();
    }

    checkLogin(){

        firebaseRef.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.changeLoadingStatus();
                this.getUserInfo(user.uid)
            }
        }.bind(this));
    }

    validateEmail(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    changeLoadingStatus(){
        this.setState({showLoading:!this.state.showLoading});
    }


    login() {
        this.changeLoadingStatus();
        firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser)=>{
                this.getUserInfo(loggedInUser.uid)
            })
            .catch(function(error) {
                this.changeLoadingStatus();
                Alert.alert(error.message)
            }.bind(this));
    }

    async loginWithFacebook() {

        const {type,token} =await Expo.Facebook.
        logInWithReadPermissionsAsync('233859937160350',{permissions:['public_profile']});
        if(type === 'success') {
            this.changeLoadingStatus();
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=gender`);
                const user_info = await response.json();
                const user_gender=user_info.gender;

            const credential= firebaseRef.auth.FacebookAuthProvider.credential(token);
            firebaseRef.auth().signInWithCredential(credential).then((loggedInUser)=>{
                const facebookUser=this.getUserInfo(loggedInUser);
                if(facebookUser){
                    firebaseRef.database().ref('users/' + loggedInUser.uid).set(facebookUser).then( ()=>{
                        this.changeLoadingStatus();
                        storeUserInfo(loggedInUser);
                        this.props.navigation.navigate('HomeScreenRoot');
                    })
                }else {
                    const user={
                        username: loggedInUser.displayName,
                        email: loggedInUser.email,
                        gender:user_gender,
                        avatar:loggedInUser.photoURL,
                        uid:loggedInUser.uid
                    };
                    firebaseRef.database().ref('users/' + loggedInUser.uid).set(user).then( ()=>{
                        this.changeLoadingStatus();
                        storeUserInfo(user);
                        this.props.navigation.navigate('HomeScreenRoot');
                    })
                }
            }).catch((error)=> {
                this.changeLoadingStatus();
                Alert.alert(error.message)
            })
        }
    }

    getUserInfo(userUID){
        firebaseRef.database().ref('users/' + userUID).once('value').then(function(userInfo) {
            this.changeLoadingStatus();
            storeUserInfo(userInfo);
            this.props.navigation.navigate('HomeScreenRoot');
        }.bind(this)).catch((error)=>{
            Alert.alert(error.message)
        });
    }

    _goToSignUp() {
        this.props.navigation.navigate('SignUp');
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
                                    <Text style={styles.travelText}>Seya</Text>
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
                                    autoCapitalize='none'
                                    keyboardAppearance="light"
                                    placeholder="Email"
                                    value={this.state.email}
                                    returnKeyType="next"
                                    onSubmitEditing={(event) => {
                                        this.setState({email_valid: this.validateEmail(event.nativeEvent.text)});
                                        this.passwordInput.focus();
                                    }}
                                    onBlur={()=>{
                                        this.setState({email_valid: this.validateEmail(this.state.email)});
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
        width: 240,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30
    },
    disabledButtonStyle:{
        height: 50,
        width: 240,
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