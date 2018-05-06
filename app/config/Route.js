import React from 'react'
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';
import Activities from '../screens/Activities';
import Initiate from '../screens/Initiate';
import Schedule from '../screens/Schedule';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import InitiateIntro from '../screens/InitiateIntro';
import InitiateStep1 from '../screens/InitiateStep1';
import InitiateStep2 from '../screens/InitiateStep2';
import InitiateStep3 from '../screens/InitiateStep3';
import InitiateStepEnd from '../screens/InitiateStepEnd';


export const InitiateStack = StackNavigator({
    InitiateIntro: {
        screen: InitiateIntro,
    },
    InitiateStep1: {
        screen: InitiateStep1,
    },
    InitiateStep2: {
        screen: InitiateStep2,
    },
    InitiateStep3: {
        screen: InitiateStep3,
    },
    InitiateStepEnd: {
        screen: InitiateStepEnd,
    },
}, {
    navigationOptions: {
        gesturesEnabled: false,
    },
});

export const ActivitiesStack = StackNavigator({
    Activities: {
        screen: Activities,
    },
});
export const ScheduleStack = StackNavigator({
    Schedule: {
        screen: Schedule,
    },
});


export const Tabs = TabNavigator({
    Activities: {
        screen: ActivitiesStack,
        navigationOptions: {
            tabBarLabel: 'Activities',
            tabBarIcon: ({tintColor}) => <Icon name='home' type='simple-line-icon' color={tintColor}/>
        }
    },

    Initiate: {
        screen: InitiateStack,
        navigationOptions: {
            tabBarLabel: 'Initiate',
            tabBarIcon: ({tintColor}) => <Icon name='plus' type='simple-line-icon' color={tintColor}/>
        }
    },


    Schedule: {
        screen: ScheduleStack,
        navigationOptions: {
            tabBarLabel: 'Schedule',
            tabBarIcon: ({tintColor}) => <Icon name='calendar' type='simple-line-icon' color={tintColor}/>
        },
    },

}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
        // inactiveTintColor: '#1DA1F2',
        activeTintColor: '#1DA1F2',

        showLabel: false,
        style: {
            elevation: 8,
            shadowOpacity: 0.1,


        },
    }
});

export const HomeScreenRoot = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
    Profile: {
        screen: Profile,
    },

}, {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    },
});

export const Root = StackNavigator({
    // Welcome:{
    //     screen: Welcome
    // },
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    HomeScreenRoot: {
        screen: HomeScreenRoot,
    },
}, {
    //If you need change the first screen when APP open, change the  initialRouteName, e.g. set it to 'HomeScreenRoot' will skip the login page
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    },
})
