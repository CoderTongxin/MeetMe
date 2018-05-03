import React from 'react';

import {StyleSheet, View, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import {
    ListItem,
    Button,
    Icon
} from 'react-native-elements';
import Modal from 'react-native-modal'
import Notice from './Notice'
import ActivityDetail from './ActivityDetail'
import {firebaseRef} from "../servers/Firebase";
const {width, height} = Dimensions.get("window");
const MODAL_HEIGH = height * 0.8;
const MODAL_WIDTH = width * 0.8;

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
                                <Modal isVisible={this.state.showDetail}
                                       onBackdropPress={this.toggleCancel}
                                       onBackButtonPress={this.toggleCancel}
                                       animationIn='slideInRight'
                                       animationOut='slideOutLeft'
                                       backdropColor={'#2E3347'}
                                       backdropOpacity={0}
                                >
                                    <View style={styles.modalContainer}>
                                        <Image source={this.chooseAvatar(this.state.activity.category)} style={styles.image}/>
                                        <View style={styles.closeIcon}>
                                            <TouchableOpacity onPress={this.toggleCancel}>
                                                <Icon name="close" size={28} color="#2E3347"/>
                                            </TouchableOpacity>
                                        </View>
                                        <ActivityDetail act={this.state.activity}/>
                                        {this.state.activity.owner.uid === this.props.user.uid ?
                                            <Button
                                                style={styles.button}
                                                backgroundColor='#03A9F4'
                                                fontFamily='Lato'
                                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                                title="Delete"
                                                onPress={this.deleteActivity}
                                            /> :
                                            <Button
                                                style={styles.button}
                                                backgroundColor='#03A9F4'
                                                fontFamily='Lato'
                                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                                title="Quit"
                                                onPress={this.quitActivity}
                                            />
                                        }
                                    </View>
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
    },
    image: {
        flex: 2,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    modalContainer: {
        height: MODAL_HEIGH,
        width:'auto',
        elevation: 2,
        backgroundColor: "#FFF",
        margin: 15,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    },

    closeIcon: {
        position: "absolute",
        right: 5,
        top: 5,
    },

    button: {
        marginHorizontal: 10,
        marginBottom: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    }
})