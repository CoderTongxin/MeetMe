import React from 'react';
import {TouchableOpacity, View, Button} from 'react-native';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';
import Activities from '../pages/Activities';
import Initiate from '../pages/Initiate';
import Schedule from '../pages/Schedule';
import ActivityDetail from '../pages/ActivityDetail';
import Settings from '../pages/Settings';
import MapView from '../pages/MapView';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import MainMenu from '../pages/MainMenu';
import UserProfile from '../pages/UserProfile';

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


export const ProfileStack = StackNavigator({
    Settings: {
        screen: Profile,
        navigationOptions: {
            headerTitleStyle: {textAlign: "center", flex: 1},
            title: 'Profile',
            headerLeft: (<View></View>),
            headerRight: (<View></View>),
        }
    },
});


export const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitleStyle: {textAlign: "center", flex: 1},
            title: 'Settings',
            headerLeft: (<View></View>),
            headerRight: (<View></View>),
        }
    },
});


export const MapViewStack = StackNavigator({
    MapViewStack: {
        screen: MapView,
    },
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
        screen: MapViewStack,
    },
    Profile: {
        screen: ProfileStack,
    },
    Settings: {
        screen: SettingsStack,
    }
}, {
    mode: 'modal',
    headerMode: 'none',
});

export const Root = StackNavigator({
    Login: {
        screen: Login
    },
    Signup: {
        screen: SignUp
    },
    MainMenu: {
        screen: MainMenu
    },
    UserProfile: {
        screen: UserProfile
    },
    HomeScreenRoot: {
        screen: HomeScreenRoot,
    },
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
});
