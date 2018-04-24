import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';
import Activities from '../pages/Activities';
import Initiate from '../pages/Initiate';
import Schedule from '../pages/Schedule';
import ActivityDetail from '../pages/ActivityDetail';
import Settings from '../pages/Settings';
import MapView from '../pages/MapView';

export const InitiateStack = StackNavigator({
    Initiate: {
        screen: Initiate,
        navigationOptions: {
            headerTitleStyle: {textAlign: "center", flex: 1},
            title: 'Initiate',
            headerLeft: (<View></View>),
            headerRight:
                <View style={{paddingRight: 10}}>
                    <TouchableOpacity>
                        <Icon name="account-circle" size={25} color="#808080"/>
                    </TouchableOpacity>
                </View>
            ,
        }
    },
});


export const ActivitiesStack = StackNavigator({
    Activities: {
        screen: Activities,
        navigationOptions: {
            headerTitleStyle: {textAlign: "center", flex: 1},
            title: 'Activities',
            headerLeft: (<View></View>),
            headerRight:
                <View style={{paddingRight: 10}}>
                    <TouchableOpacity>
                        <Icon name="account-circle" size={25} color="#808080"/>
                    </TouchableOpacity>
                </View>,
        }
    },
    ActivityDetail: {
        screen: ActivityDetail,
    }
});


export const ScheduleStack = StackNavigator({
    Schedule: {
        screen: Schedule,
        navigationOptions: {
            headerTitleStyle: {textAlign: "center", flex: 1},
            title: 'Schedule',
            headerLeft: (<View></View>),
            headerRight:
                <View style={{paddingRight: 10}}>
                    <TouchableOpacity>
                        <Icon name="account-circle" size={25} color="#808080"/>
                    </TouchableOpacity>
                </View>,
        }
    },
    ActivityDetail: {
        screen: ActivityDetail,
    }
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
        navigationOptions: {
            headerTitleStyle: {textAlign: "center", flex: 1},
            title: 'MapViewStack',
            headerLeft: (<View></View>),
            headerRight: (<View></View>),
        }
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

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
    MapView: {
        screen: MapViewStack,
    }
}, {
    mode: 'modal',
    headerMode: 'none',
});
