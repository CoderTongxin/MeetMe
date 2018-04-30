import React from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import {
    ListItem
} from 'react-native-elements';
import {firebaseRef} from "../servers/Firebase";

const activityList = [
    {
        category: 'food',
        title: 'Yo Sushi',
        description: 'eating',
        time: {
            date: '01-05-2018',
            startTime: '14:00',
        },
        location: {
            longitude: '123',
            latitude: '456',
        },
        owner: 'djflksdjdltj',
        participants: {},
        status: 'open',
    },
    {
        category: 'game',
        title: 'Yo Sushi',
        description: 'eating',
        time: {
            date: '01-05-2018',
            startTime: '14:00',
        },
        location: {
            longitude: '123',
            latitude: '456',
        },
        owner: 'djflksdjdltj',
        participants: {},
        status: 'open',
    },
    {
        category: 'movie',
        title: 'Yo Sushi',
        description: 'eating',
        time: {
            date: '01-05-2018',
            startTime: '14:00',
        },
        location: {
            longitude: '123',
            latitude: '456',
        },
        owner: 'djflksdjdltj',
        participants: {},
        status: 'open',
    },
    {
        category: 'pet',
        title: 'Yo Sushi',
        description: 'eating',
        time: {
            date: '01-05-2018',
            startTime: '14:00',
        },
        location: {
            longitude: '123',
            latitude: '456',
        },
        owner: 'djflksdjdltj',
        participants: {},
        status: 'open',
    },
    {
        category: 'shopping',
        title: 'Yo Sushi',
        description: 'eating',
        time: {
            date: '01-05-2018',
            startTime: '14:00',
        },
        location: {
            longitude: '123',
            latitude: '456',
        },
        owner: 'djflksdjdltj',
        participants: {},
        status: 'open',
    },
    {
        category: 'sports',
        title: 'Yo Sushi',
        description: 'eating',
        time: {
            date: '01-05-2018',
            startTime: '14:00',
        },
        location: {
            longitude: '123',
            latitude: '456',
        },
        owner: 'djflksdjdltj',
        participants: {},
        status: 'open',
    },
    {
        category: 'study',
        title: 'Yo Sushi',
        description: 'eating',
        time: {
            date: '01-05-2018',
            startTime: '14:00',
        },
        location: {
            longitude: '123',
            latitude: '456',
        },
        owner: 'djflksdjdltj',
        participants: {},
        status: 'open',
    },
];

export default class ActivityList extends React.Component {

    constructor(props){
        super(props);
        super(props);
        this.state = {
            user:null,
            activities:null
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            this.setState({
                user: JSON.parse(result),
                activities:this.chooseListType(this.props.type)
            });
        });

    }
    chooseListType(type){
        const activities=this.getAllActivity();
        switch (type) {
            case 'all':
                return activities;
            case 'my':
                return this.getMyActivity(activities);
            case 'joined':
                return this.getJoinedActivity(activities);

        }
    }
    getAllActivity(){
        let activity = [
            "-LBF8NDhx5SpJY3Mf8BM",
            "-LBF8NDhx5SpJY3Mf8BM",
            "-LBF8NDhx5SpJY3Mf8BM",
            "-LBF8NDhx5SpJY3Mf8BM"
        ];
        let promises = activity.map(function(key) {
            return firebaseRef.database().ref("activities").child(key).once("value");
        });
        Promise.all(promises).then(function(snapshots) {
                  return JSON.stringify(snapshots);
            // snapshots.forEach(function(snapshot) {
            //     console.log(snapshot.key+": "+JSON.stringify(snapshot.val()));
            // });
        });
    }

    getMyActivity(activities){
        let myActivityList=[];
        activities.map()

    }


    getJoinedActivity(activities){
        let joinedActivityList=[];
        activities.map()
    }



    log() {
        console.log('hello')
    }

    chooseAvatar(category) {
        switch (category) {
            case 'food':
                return require('../../resource/images/food.png');
            case 'sports':
                return require('../../resource/images/sports.png');
            case 'game':
                return require('../../resource/images/game.png');
            case 'movie':
                return require('../../resource/images/movie.png');
            case 'pet':
                return require('../../resource/images/pet.png');
            case 'study':
                return require('../../resource/images/study.png');
            case 'shopping':
                return require('../../resource/images/shopping.png');

        }

    }

    render() {
        return (
            <View style={styles.list}>
                {this.state.activities.map((activity, i) => (
                    <ListItem
                        leftAvatar={{rounded: true, source: this.chooseAvatar(activity.category)}}
                        key={i}
                        onPress={this.log}
                        title={activity.title}
                        subtitle={activity.time.date}
                        chevron
                        bottomDivider
                        topDivider
                    />
                ))}
            </View>
        );
    }
}



const styles = StyleSheet.create({

    list: {
        backgroundColor: '#fff',
    }
})