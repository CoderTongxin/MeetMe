import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import MainMenu from './pages/MainMenu';
import UserProfile from './pages/UserProfile';
import {StackNavigator} from "react-navigation";


export const Home = StackNavigator({
        login: { screen: Login },
        signup: { screen: SignUp },
        mainMenu: {screen: MainMenu},
        userProfile: {screen: UserProfile}
    },
    {
        initialRouteName: 'login',
        headerMode: 'none'
    });