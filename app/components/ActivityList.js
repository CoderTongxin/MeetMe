import React from 'react';
import {AsyncStorage, StyleSheet, View, TouchableHighlight, Text, Alert} from 'react-native';
import {
    ListItem
} from 'react-native-elements';
import {firebaseRef} from "../servers/Firebase";


export default class ActivityList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            activities: [],
            showDetail: false
        };
        this._renderDetail=this._renderDetail.bind(this);
        this.toggleCancel=this.toggleCancel.bind(this)
    }

    componentDidMount() {
        // AsyncStorage.getItem('user', (err, result) => {
        //     this.setState({
        //         user: JSON.parse(result),
        //     });
        //     this.getUserActivityList(this.props.type)
        // });
    }

    getUserActivityList(type) {
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
        console.log(this.state.activities)
        this.state.activities.map((activity) => {
            console.log(activity)
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


    log() {
        this.setState({
            showDetail:!this.state.showDetail
        })
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

    _renderDetail() {
        if (this.state.showDetail) {
            return (
                <TouchableHighlight>
                    onPress={this.toggleCancel()}>
                    <View>
                        <Text>Cancel</Text>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    }

    toggleCancel(){
        this.setState({
            showDetail:!this.state.showDetail
        })
    }
    render() {
        return (
            <View>
                <View style={styles.list}>
                    {this.props.list.map((activity, i) => (
                        <ListItem
                            leftAvatar={{rounded: true, source: this.chooseAvatar(activity.category)}}
                            key={i}
                            onPress={this.log}
                            title={activity.title}
                            subtitle={activity.title}
                            chevron
                            bottomDivider
                            topDivider
                        />
                    ))}
                </View>
                {this._renderDetail()}
            </View>
        );
    }
}


const styles = StyleSheet.create({

    list: {
        backgroundColor: '#fff',
    }
})