import React from 'react';

import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
    ListItem,
    Button,
    Avatar
} from 'react-native-elements';

import Modal from 'react-native-modal'
import Notice from './Notice'

import {firebaseRef} from "../servers/Firebase";


export default class ActivityList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            activity: null,
            showDetail: false
        };
        this.toggleCancel = this.toggleCancel.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
    }

    componentDidMount() {

    }

    chooseAvatar(category) {
        switch (category) {
            case 'Food':
                return require('../../resource/images/food.png');
            case 'Sport':
                return require('../../resource/images/sports.png');
            case 'Game':
                return require('../../resource/images/game.png');
            case 'Movie':
                return require('../../resource/images/movie.png');
            case 'Pet':
                return require('../../resource/images/pet.png');
            case 'Study':
                return require('../../resource/images/study.png');
            case 'Shopping':
                return require('../../resource/images/shopping.png');
            default:
                return require('../../resource/images/shopping.png')

        }

    }


    toggleCancel() {
        this.setState({
            showDetail: !this.state.showDetail,
        })
    }

    toggle(activity) {
        firebaseRef.database().ref('activities/' + activity.key).on('value', (activityInfo) => {
            this.setState({
                activity: activityInfo.val(),
                activityKey: activityInfo.key,
                showDetail: !this.state.showDetail
            })
        })

    }


    deleteActivity() {
        firebaseRef.database().ref('activities/' + this.state.activityKey).remove().then(() => {
            firebaseRef.database().ref('users/' + this.props.user.uid + '/activities/' + this.state.activityKey).remove().then(() => {
                this.setState({
                    showDetail: !this.state.showDetail,
                    activity: null
                })
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    quitActivity() {
        firebaseRef.database().ref('activities/' + this.state.activityKey + '/participants/' + this.state.user.uid).remove().then(() => {
            // firebaseRef.database().ref('users/'+this.props.user.uid+'/activities/'+this.state.activity.key).remove().then(()=>{
            this.setState({
                showDetail: !this.state.showDetail,
                activity: null
            })
            // })
        })
    }

    getIcon(activity) {
        if (activity.owner.uid === this.props.user.uid) {
            return 'person'
        }
        return '';
    }

    render() {
        return (
            <View style={{flex:1}}>

                {this.props.list.length > 0 ?
                    <ScrollView>
                        <View style={styles.list}>
                            {this.props.list.map((activity, i) => (
                                <ListItem
                                    leftAvatar={{rounded: true, source: this.chooseAvatar(activity.val().category)}}
                                    rightIcon={{name: this.getIcon(activity.val())}}
                                    key={i}
                                    onPress={() => this.toggle(activity)}
                                    title={activity.val().title}
                                    subtitle={activity.val().time.date}
                                    titleStyle={{fontWeight: 'bold'}}
                                    subtitleStyle={{color: 'grey', fontSize: 15}}
                                    chevron
                                    bottomDivider
                                    topDivider
                                />
                            ))}

                            {this.state.activity ?
                                <Modal
                                    isVisible={this.state.showDetail}
                                    animationIn='slideInRight'
                                    animationOut='slideOutLeft'
                                >
                                    <View style={styles.container}>
                                        <View style={styles.avatarContainer}>
                                            <Avatar
                                                xlarge
                                                rounded
                                                source={this.chooseAvatar(this.state.activity.category)}
                                                onPress={() => console.log("Works!")}
                                                activeOpacity={0.7}
                                            />
                                        </View>
                                        <Text>{this.state.activity.category}</Text>
                                        <Text>{this.state.activity.title}</Text>
                                        <Text>{this.state.activity.description}</Text>
                                        <Text>{this.state.activity.owner.username}</Text>
                                        <Button
                                            title="Close"
                                            onPress={this.toggleCancel}
                                        />
                                    </View>
                                    {this.state.activity.owner.uid === this.props.user.uid ?
                                        <Button
                                            title="Delete"
                                            onPress={this.deleteActivity}
                                        /> :
                                        <Button
                                            title="Quit"
                                            onPress={this.quitActivity}
                                        />
                                    }
                                </Modal> :
                                <View/>}
                        </View>
                    </ScrollView> :

                    <Notice/>
                }
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff",
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: -2}
    },
    avatarContainer: {
        alignItems: 'center'
    },
    list: {
        backgroundColor: '#fff',
    }
})