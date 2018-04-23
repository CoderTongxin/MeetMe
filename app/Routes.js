import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './screens/Login';
import SignUp from './screens/Signup';
import userProfile from './screens/UserProfile'
import home from './screens/Home'

export default class Routs extends React.Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login"/>
                    <Scene key="signUp" component={SignUp} title="Register"/>
                    <Scene key="userProfile" component={userProfile} title="UserProfile"/>
                    <Scene key="home" component={home} title="Home" initial={true}/>
                </Stack>
            </Router>
        )
    }
}
