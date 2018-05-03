import React from 'react';
import {
    View,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import TabView from '../components/TabView';
import {firebaseRef} from '../servers/Firebase';
const userRef = firebaseRef.database().ref('users');

export default class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: null
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            const user=JSON.parse(result);
            userRef.child(user.uid).on('value', (userInfo) => {
                this.getUserActivityList(userInfo.val())
            })
        });
    }

    getUserActivityList(user) {
        if (user.activities) {

            const userActivityList = Object.values(user.activities);
            const activityPromises = userActivityList.map(key => {
                return firebaseRef.database().ref('activities/' + key.actId).once("value", activity => activity)
            });

            Promise.all(activityPromises)
                .then(activities => {
                    let myActivities = [];

                    activities.map((activity) => {
                        if (activity.val().owner.uid === user.uid) {
                            myActivities.push(activity)
                        }
                    });
                    const joinedActivities = [];
                    activities.map((activity) => {
                        if (activity.val().owner.uid !== user.uid) {
                            joinedActivities.push(activity.val().category)
                        }
                    });

                    this.setState({
                        activities: {
                            'activities': activities,
                            'myActivities': myActivities,
                            'joinedActivities': joinedActivities,
                            'user': user
                        },
                    });

                })
                .catch(err => {
                    Alert.alert(err)
                });
        } else {
            this.setState({
                activities: {...this.props, 'noActivities': true},
            });
        }
    }

    render() {
        return (
            <TabView {...this.state.activities}/>
    )
    }
}
let load=true;
Schedule.navigationOptions = ({navigation}) => ({
    title: 'Schedule',
    headerStyle: {
        elevation: 2,
        shadowOpacity: 1,
        backgroundColor: '#2E3347',
    },
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerTintColor: '#fff',
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity onPress={() => {
                if(load){
                    load=false;
                    navigation.navigate('Profile');
                    setTimeout(() => {
                        load = true;
                    }, 700);
                }
            }}>
                <Icon name='user' type='evilicon' size={28} color='#fff'/>
            </TouchableOpacity>
        </View>,
});

