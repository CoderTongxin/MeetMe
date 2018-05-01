import React from 'react';
import {
    Text,
    View,
    Alert,
    StyleSheet,
    Dimensions
} from 'react-native';
import {Button} from 'react-native-elements';
import Logo from '../components/Logo';
import {firebaseRef} from '../servers/Firebase'
import SubmitButton from '../components/SubmitButton';
import Loader from '../components/Loader';
import {HomeScreenRoot} from "../config/Route";
import {storeUserInfo} from '../common/js/userInfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.pickerTouchable.normal.height = 36;
stylesheet.pickerTouchable.error.height = 36;
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
            nullOption: {value: '', text: 'Please select your gender'},
            error: 'Gender cannot be blank',
            stylesheet: stylesheet,
        },
        password: {
            placeholder: 'Enter your password here',
            error: 'Password cannot be blank',
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

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isAuthenticated: false,
        };
        this.signup = this.signup.bind(this);
        this._goBack = this._goBack.bind(this);
    }

    signup = () => {
        let userInfo = this.refs.form.getValue();
        if (userInfo) {
            this.setState({loading: true});
            firebaseRef.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
                .then((loggedInUser) => {
                    const user = {
                        username: userInfo.username,
                        email: userInfo.email,
                        gender: userInfo.gender,
                        uid: loggedInUser.uid,
                        avatar: this.defaultAvatar(userInfo.gender)
                    };
                    firebaseRef.database().ref('users/' + loggedInUser.uid).set(user).then(() => {
                            this.storeUserInfo(user.uid)
                        }
                    );
                }).catch(function (error) {
                this.setState({loading: false});
                Alert.alert(error.message);
            }.bind(this));
        }
    };

    defaultAvatar(userGender){
        switch(userGender) {
            case 'female':
                return 'https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png';
            case 'male':
                return 'https://tiraerasdereggaeton.com/wp-content/uploads/2018/03/avatar-user-boy-389cd1eb1d503149-512x512.png';
            default:
                return 'https://freeiconshop.com/wp-content/uploads/edd/bulb-curvy-flat.png'
        }
    }
    storeUserInfo(userUID) {
        this.setState({loading: false});
        storeUserInfo(userUID);
        this.props.navigation.navigate('HomeScreenRoot');
    }

    _goBack() {
        this.props.navigation.navigate('Login');
    }


    render() {
        return (
            <KeyboardAwareScrollView>
                <Loader loading={this.state.loading}/>
                <View style={styles.container}>
                    <Logo/>
                    <Form
                        ref='form'
                        type={UserInfo}
                        options={Options}
                    />
                    <Button
                        title="Submit"
                        onPress={this.signup}
                    />
                    <View style={styles.footerContainer}>
                        <View style={styles.footerView}>
                            <Text style={{color: '#000000'}}>
                                Already have an account?
                            </Text>
                            <Button
                                title="Login"
                                clear
                                activeOpacity={0.5}
                                titleStyle={{color: '#616161', fontSize: 15}}
                                containerStyle={{marginTop: -10}}
                                onPress={this._goBack}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    formContainer: {
        flex: 1,
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    footerView: {
        marginTop:15,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
