import React from 'react';
import {
    Animated,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
     Alert,
    AsyncStorage
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import TabView from '../components/TabView'
import {firebaseRef} from '../servers/Firebase'

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
        console.log(this.state.user.activities);
        const userActivityList = Object.values(this.state.user.activities);

        const activityPromises = userActivityList.map(key => {
            return firebaseRef.database().ref('activities/'+key.actId).once("value", activity => activity)
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

        //
        // let myActivityList = [];
        // console.log(this.state.activities);
        // this.state.activities.map((activity) => {
        //     console.log(activity);
        //     if (activity.owner.uid === this.state.user.uid) {
        //         myActivityList.push(activity)
        //     }
        // });


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