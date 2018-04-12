import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import SignUp from './pages/Signup';

export default class Routes extends Component<{}> {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login" initial={true}/>
                    <Scene key="signUp" component={SignUp} title="Register"/>
                </Stack>
            </Router>
        )
    }
}