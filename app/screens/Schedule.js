import React from 'react';
import {
    Animated,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Dimensions,
    Platform, Alert, AsyncStorage
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import ActivityList from '../components/ActivityList'

import {
    TabViewAnimated,
    TabBar,
    SceneMap,
    TabViewPagerScroll,
    TabViewPagerPan,
} from 'react-native-tab-view'
import TabView from '../components/TabView'
import {firebaseRef} from '../servers/Firebase'

const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = {
    height: 0,
    width: SCREEN_WIDTH,
};


// const FirstRoute = () => <ActivityList type='all'/>;
// const SecondRoute = () => <ActivityList type='my'/>;
// const ThirdRoute = () => <ActivityList type='joined'/>;

export default class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            activities:[],
            myActivities:[],
            joinedActivities:[],
            showDetail: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            this.setState({
                user: JSON.parse(result),
            });
            this.getUserActivityList(this.props.type)
        });
    }

    getUserActivityList() {
        const userActivityList = Object.values(this.state.user.activities);

        const activityPromises = userActivityList.map(key => {
            return firebaseRef.database().ref().child("activities").child(key.actId).once("value", activity => Promise.resolve(activity));
        });

        Promise.all(activityPromises)
            .then(activities => {
                this.setState({
                    activities: activities
                });
            })
            .catch(err => {
                Alert.alert(err)
            });


        let myActivityList = [];
        console.log(this.state.activities);
        this.state.activities.map((activity) => {
            console.log(activity);
            if (activity.owner.uid === this.state.user.uid) {
                myActivityList.push(activity)
            }
        });


    }


    getMyActivity(activities) {

        let myActivityList = [];
        activities.map((activity) => {
            console.log(activity.owner.uid);
            if (activity.owner.uid === this.state.user.uid) {
                myActivityList.push(activity)
            }
        });
        return myActivityList;

    }


    getJoinedActivity(activities) {
        let joinedActivityList = [];
        activities.map((activity) => {
            if (activity.owner.uid !== this.state.user.uid) {
                joinedActivityList.push(activity)
            }
        });
        return joinedActivityList;
    }
     //
     // constructor(props){
     //     super(props);
     //
     //     this.state = {
     //         tabs: {
     //             index: 0,
     //             routes: [
     //                 {key: 'all', title: 'all activity', count:0},
     //                 {key: 'my', title: 'my activity', count: 0},
     //                 {key: 'joined', title: 'joined activity', count: 0},
     //             ],
     //         },
     //     }
     // }


    // _handleIndexChange = index => {
    //     this.setState({
    //         tabs: {
    //             ...this.state.tabs,
    //             index,
    //         },
    //     })
    // };
    //
    //
    // _renderScene = SceneMap({
    //     all: FirstRoute,
    //     my: SecondRoute,
    //     joined: ThirdRoute
    // });
    //
    // _renderHeader = props => {
    //     return (
    //         <TabBar
    //             {...props}
    //             indicatorStyle={styles.indicatorTab}
    //             renderLabel={this._renderLabel(props)}
    //             pressOpacity={0.8}
    //             style={styles.tabBar}
    //         />
    //     )
    // };
    //
    //
    // _renderLabel = props => ({route, index}) => {
    //     const inputRange = props.navigationState.routes.map((x, i) => i);
    //     const outputRange = inputRange.map(
    //         inputIndex => (inputIndex === index ? 'black' : 'gray')
    //     );
    //     const color = props.position.interpolate({
    //         inputRange,
    //         outputRange,
    //     });
    //     return (
    //         <View>
    //             <Animated.Text style={[styles.tabLabelText, {color}]}>
    //                 {route.count}
    //             </Animated.Text>
    //             <Animated.Text style={[styles.tabLabelNumber, {color}]}>
    //                 {route.title}
    //             </Animated.Text>
    //         </View>
    //     )
    // };
    //
    // _renderPager = props => {
    //     return Platform.OS === 'ios' ? (
    //         <TabViewPagerScroll {...props} />
    //     ) : (
    //         <TabViewPagerPan {...props} />
    //     )
    // };

    render() {
        return (
            <ScrollView>
                <TabView activities={this.state.activities}/>
            </ScrollView>
        );
    }
}

Schedule.navigationOptions = ({navigation}) => ({
    title: 'Schedule',
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="account-circle" size={25} color="#808080"/>
            </TouchableOpacity>
        </View>,
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        backgroundColor: '#fff',
    },
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