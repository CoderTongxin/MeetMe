import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import SignUp from './pages/Signup';
import userProfile from './pages/UserProfile'
import home from './pages/Home'

export default class Routs extends React.Component {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login"/>
                    <Scene key="signUp" component={SignUp} title="Register"/>
                    <Scene key="userProfile" component={userProfile} title="UserProfile"/>
                    <Scene key="userProfile" component={userProfile} title="UserProfile"/>
                    <Scene key="home" component={home} title="UserProfile" initial={true}/>
                </Stack>
            </Router>
        )
    }
}
