import React from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Dimensions,
    Platform
} from 'react-native';
import ActivityList from './ActivityList'

import {
    TabViewAnimated,
    TabBar,
    TabViewPagerScroll,
    TabViewPagerPan,
} from 'react-native-tab-view'
import Loader from './Loader'
import Notice from "./Notice";

const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = {
    height: 0,
    width: SCREEN_WIDTH,
};


export default class TabView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadActivity: false,
            tabs: {
                index: 0,
                routes: [
                    {key: 'activities', title: 'all activity'},
                    {key: 'myActivities', title: 'my activity'},
                    {key: 'joinedActivities', title: 'joined activity'},
                ],
            },
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


    _renderScene = ({route: {key}}) => {

        if (!this.props.noActivities) {
            if (this.props.activities) {
                switch (key) {
                    case 'activities':
                        return <ActivityList {...this.props} list={this.props.activities}/>;
                    case 'myActivities':
                        return <ActivityList {...this.props} list={this.props.myActivities}/>;
                    case 'joinedActivities':
                        return <ActivityList {...this.props} list={this.props.joinedActivities}/>;
                }
            } else {
                return <Loader/>
            }
        } else {
            return <Notice/>
        }

    };

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
        let countList=[];
        if(this.props.activities){
            countList=[this.props.activities.length,this.props.myActivities.length,this.props.joinedActivities.length]
        }
        return (

            <View>
                <Animated.Text style={[styles.tabLabelText, {color}]}>
                    {this.props.activities?
                        countList[index]
                        : ''
                    }
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