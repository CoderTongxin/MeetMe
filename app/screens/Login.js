import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import {Font} from 'expo';
import {
    Text,
    View,
    StyleSheet,
    Alert,
} from 'react-native';
import {firebaseRef} from '../servers/Firebase'
import Loader from '../components/Loader'
import {HomeScreenRoot} from "../config/Route";
import {storeUserInfo} from '../common/js/userInfo'

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
            password_valid: true,
            loggedIn: false
        };
        this.login = this.login.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this)
    }

    async componentDidMount() {
        await Font.loadAsync({
            'regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
            'light': require('../../assets/fonts/Montserrat-Light.ttf'),
            'bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        });
        this.setState({fontLoaded: true});
        if (!this.state.loggedIn) {
            this.checkLogin();
        }
    }

    checkLogin() {
        console.log("check");
        firebaseRef.auth().onAuthStateChanged(function (user) {
            if (user) {
                this.setState({
                    loggedIn: true
                });
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

    changeLoadingStatus() {
        this.setState({showLoading: !this.state.showLoading});
    }


    login() {
        this.changeLoadingStatus();
        firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((loggedInUser) => {
                this.getUserInfo(loggedInUser.uid)
            })
            .catch(function (error) {
                this.changeLoadingStatus();
                Alert.alert(error.message)
            }.bind(this));
    }

    async loginWithFacebook() {

        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('233859937160350', {permissions: ['public_profile']});
        if (type === 'success') {
            this.changeLoadingStatus();
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}&fields=gender`);
            const user_info = await response.json();
            const user_gender = user_info.gender;

            const credential = firebaseRef.auth.FacebookAuthProvider.credential(token);
            firebaseRef.auth().signInWithCredential(credential).then((loggedInUser) => {
                const facebookUser = this.getUserInfo(loggedInUser);
                if (facebookUser) {
                    firebaseRef.database().ref('users/' + loggedInUser.uid).set(facebookUser).then(() => {
                        this.changeLoadingStatus();
                        storeUserInfo(loggedInUser);
                        this.props.navigation.navigate('HomeScreenRoot');
                    })
                } else {
                    const user = {
                        username: loggedInUser.displayName,
                        email: loggedInUser.email,
                        gender: user_gender,
                        avatar: loggedInUser.photoURL,
                        uid: loggedInUser.uid
                    };
                    firebaseRef.database().ref('users/' + loggedInUser.uid).set(user).then(() => {
                        this.changeLoadingStatus();
                        storeUserInfo(user);
                        this.props.navigation.navigate('HomeScreenRoot');
                    })
                }
            }).catch((error) => {
                this.changeLoadingStatus();
                Alert.alert(error.message)
            })
        }
    }

    getUserInfo(userUID) {
        firebaseRef.database().ref('users/' + userUID).once('value').then(function (userInfo) {
            this.changeLoadingStatus();
            storeUserInfo(userInfo);
            this.props.navigation.navigate('HomeScreenRoot');
        }.bind(this)).catch((error) => {
            Alert.alert(error.message)
        });
    }

    _goToSignUp() {
        this.props.navigation.navigate('SignUp');
    }

    render() {

        return (
            <View style={styles.container}>


                <Loader loading={this.state.showLoading}/>

                {this.state.fontLoaded ?
                    <View style={styles.loginView}>
                        <View style={styles.title}>
                                <Text style={styles.travelText}>Seya</Text>
                        </View>
                        <View style={styles.loginInput}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name='user-o'
                                        size={25}
                                    />
                                }
                                containerStyle={styles.inputContainer}
                                onChangeText={(text) => this.setState({email_valid: true, email: text})}
                                inputStyle={styles.inputText}
                                autoCapitalize='none'
                                keyboardAppearance="light"
                                placeholder="Email"
                                value={this.state.email}
                                returnKeyType="next"
                                onSubmitEditing={(event) => {
                                    this.setState({email_valid: this.validateEmail(event.nativeEvent.text)});
                                    this.passwordInput.focus();
                                }}
                                onBlur={() => {
                                    this.setState({email_valid: this.validateEmail(this.state.email)});
                                }}
                                placeholderTextColor="grey"
                                errorStyle={styles.errorText}
                                errorMessage={this.state.email_valid ? null : "Please enter a valid email address"}
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name='lock'
                                        size={25}
                                    />
                                }
                                containerStyle={styles.inputContainer}
                                onChangeText={(text) => this.setState({password_valid: true, password: text})}
                                inputStyle={styles.inputText}
                                secureTextEntry={true}
                                keyboardAppearance="light"
                                placeholder="Password"
                                returnKeyType="done"
                                ref={input => this.passwordInput = input}
                                onSubmitEditing={(event) => {
                                    this.setState({
                                        password_valid: this.validatePassword(event.nativeEvent.text)
                                    });
                                }}
                                placeholderTextColor="grey"
                                errorStyle={styles.errorText}
                                errorMessage={this.state.password_valid ? null : "Password should have at least 6 characters"}
                            />
                        </View>
                        <View style={styles.buttonGroup}>
                            <Button
                                title='Log in'
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPress={() => this.login()}
                                disabled={!this.state.email_valid || this.state.password.length < 6}
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
                                        size={22}
                                        color='#fff'
                                    />
                                }

                                title='Login with Facebook'
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPress={() => this.loginWithFacebook()}
                                buttonStyle={styles.facebookButtonStyle}
                                titleStyle={styles.facebookButtonTitle}
                            />
                        </View>

                        <View style={styles.footerView}>
                            <Text style={{color: '#000'}}>
                                Don't have an account?
                            </Text>
                            <Button
                                title="Sign up"
                                clear
                                activeOpacity={0.5}
                                titleStyle={{color: '#424242', fontSize: 15}}
                                containerStyle={{marginTop: -10}}
                                onPress={() => this._goToSignUp()}
                            />
                        </View>
                    </View> :
                    <Text>Loading...</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    inputContainer: {
        marginVertical: 10,
        width: 220
    },
    inputText: {
        marginLeft: 10,
        color: '#2E3347'
    },
    errorText: {
        textAlign: 'center',
        fontSize: 12
    },
    loginView: {
        flex: 1,
        marginTop: 45,
        backgroundColor: 'transparent',
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: '#2E3347',
        fontSize: 30,
        fontFamily: 'bold'
    },
    plusText: {
        color: '#2E3347',
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
    buttonGroup: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    buttonStyle: {
        elevation: 2,
        backgroundColor: "#388e3c",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: 40,
        width: 240,
    },
    disabledButtonStyle: {
        shadowColor: "#fff",
        backgroundColor: "#388e3c",
        height: 40,
        width: 240,
    },
    disabledTitleStyle: {
        fontWeight: 'bold',
        color: '#efefef'
    },
    buttonTitle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18
    },
    facebookButtonStyle: {
        elevation: 2,
        backgroundColor: "#3B5998",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: 40,
        width: 240,
    },
    facebookButtonTitle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18
    }
})