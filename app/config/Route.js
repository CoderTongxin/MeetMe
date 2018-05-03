import React from 'react';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';
import Activities from '../screens/Activities';
import Initiate from '../screens/Initiate';
import Schedule from '../screens/Schedule';
import ActivityDetail from '../screens/ActivityDetail';
import Settings from '../screens/Settings';
import ActivityInfo from '../screens/ActivityInfo';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import InitiateStep2 from '../screens/InitiateStep2';
import InitiateStep3 from '../screens/InitiateStep3';
// import Welcome from '../screens/Welcome';

export const InitiateStack = StackNavigator({
    Initiate: {
        screen: Initiate,
    },
    InitiateStep2: {
        screen: InitiateStep2,
    },
    InitiateStep3: {
        screen: InitiateStep3,
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
    ActivityDetail: {
        screen: ActivityDetail,
    }
});

export const ScheduleStack = StackNavigator({
    Schedule: {
        screen: Schedule,
    },
    ActivityDetail: {
        screen: ActivityDetail,
    }
});

export const Tabs = TabNavigator({
    Activities: {
        screen: ActivitiesStack,
        navigationOptions: {
            tabBarLabel: 'Activities',
            tabBarIcon: ({tintColor})=><Icon name='home' type='simple-line-icon' color={tintColor}/>
        }
    },

    Initiate: {
        screen: InitiateStack,
        navigationOptions: {
            tabBarLabel: 'Initiate',
            tabBarIcon: ({tintColor})=><Icon name='plus' type='simple-line-icon' color={tintColor}/>
        }
    },


    Schedule: {
        screen: ScheduleStack,
        navigationOptions: {
            tabBarLabel: 'Schedule',
            tabBarIcon:  ({tintColor})=> <Icon name='calendar' type='simple-line-icon' color={tintColor}/>
        },
    },

}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
        inactiveTintColor: '#2E3347',

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
    // MapView: {
    //     screen: MapView,
    // },
    ActivityInfo:{
        screen: ActivityInfo,
    },
    Profile: {
        screen: Profile,
    },
    Settings: {
        screen: Settings,
    }

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
