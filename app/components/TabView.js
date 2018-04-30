import React from 'react';
import {
    Animated,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import ActivityList from './ActivityList'

import {
    TabViewAnimated,
    TabBar,
    SceneMap,
    TabViewPagerScroll,
    TabViewPagerPan,
} from 'react-native-tab-view'
import {firebaseRef} from '../servers/Firebase'

const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = {
    height: 0,
    width: SCREEN_WIDTH,
};



export default class TabView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            tabs: {
                index: 0,
                routes: [
                    {key: 'all', title: 'all activity', count:props.activities},
                    {key: 'my', title: 'my activity', count: props.activities},
                    {key: 'joined', title: 'joined activity', count: props.activities},
                ],
            },
            // activities:props.activities,
            // myActivities:props.myActivities,
            // joinedActivities:props.joinedActivities
        }
    }


    _handleIndexChange = index => {
        this.setState({
            tabs: {
                ...this.state.tabs,
                index,
            },
        })
    };

    _renderScene = ({ route: { key } }) => {
        this.props.activities.map((activity)=>{
            console.log(activity.category)
        })
        switch (key) {
            case 'all':
                return <ActivityList list={this.props.activities}/>
            case 'my':
                return <ActivityList list={this.props.activities}/>
            case 'joined':
                return <ActivityList list={this.props.activities}/>
            default:
                return <View />
        }
    }

    _renderHeader = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={styles.indicatorTab}
                renderLabel={this._renderLabel(props)}
                pressOpacity={0.8}
                style={styles.tabBar}
            />
        )
    };


    _renderLabel = props => ({route, index}) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(
            inputIndex => (inputIndex === index ? 'black' : 'gray')
        );
        const color = props.position.interpolate({
            inputRange,
            outputRange,
        });
        return (
            <View>
                <Animated.Text style={[styles.tabLabelText, {color}]}>
                    {route.count}
                </Animated.Text>
                <Animated.Text style={[styles.tabLabelNumber, {color}]}>
                    {route.title}
                </Animated.Text>
            </View>
        )
    };

    _renderPager = props => {
        return Platform.OS === 'ios' ? (
            <TabViewPagerScroll {...props} />
        ) : (
            <TabViewPagerPan {...props} />
        )
    };

    render() {
        return (
                <TabViewAnimated
                    navigationState={this.state.tabs}
                    renderScene={this._renderScene}
                    renderPager={this._renderPager}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={initialLayout}
                />
        );
    }
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#EEE',
    },
    tabLabelNumber: {
        color: 'gray',
        fontSize: 12.5,
        textAlign: 'center',
    },
    tabLabelText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    indicatorTab: {
        backgroundColor: 'transparent',
    },
})