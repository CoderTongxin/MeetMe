import React from 'react';
import {TouchableOpacity, View, Button} from 'react-native';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';
import Activities from '../screens/Activities';
import Initiate from '../screens/Initiate';
import Schedule from '../screens/Schedule';
import ActivityDetail from '../screens/ActivityDetail';
import Settings from '../screens/Settings';
import MapView from '../screens/MapView';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';


export const InitiateStack = StackNavigator({
    Initiate: {
        screen: Initiate,
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
    Initiate: {
        screen: InitiateStack,
        navigationOptions: {
            tabBarLabel: 'Initiate',
            tabBarIcon: ({tintColor}) => <Icon name="add-circle" size={25} color={tintColor}/>
        }

    },

    Activities: {
        screen: ActivitiesStack,
        navigationOptions: {
            tabBarLabel: 'Activities',
            tabBarIcon: ({tintColor}) => <Icon name="local-activity" size={25} color={tintColor}/>
        }

    },
    Schedule: {
        screen: ScheduleStack,
        navigationOptions: {
            tabBarLabel: 'Schedule',
            tabBarIcon: ({tintColor}) => <Icon name="view-list" size={25} color={tintColor}/>
        }
    },

}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
});

export const HomeScreenRoot = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
    MapView: {
        screen: MapView,
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
    initialRouteName: 'SignUp',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
    },
})
