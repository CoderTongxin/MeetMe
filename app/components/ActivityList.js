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
            showDetail: false,
            participantsNum: 0,
            participantsNames: '',
            activityKey:''
        };
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
                showDetail: !this.state.showDetail,
                activityKey: activity.key,
            });
            if(!activityInfo){
                this.getParticipantsUsername(activityInfo.val().participants)
            }
        })

    }

    getParticipantsUsername(participants) {
        let count = 0;
        let names = '';
        for (const key in participants) {
            if (count === 0) {
                names += participants[key].username;
            } else {
                names += ', ' + participants[key].username;
            }
            count++
        }
        this.setState({
            participantsNames: names,
            participantNum: count,
        });

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
        console.log('quit');
        firebaseRef.database().ref('activities/' + this.state.activityKey + '/participants/' + this.props.user.uid).remove().then(() => {
            firebaseRef.database().ref('users/' + this.props.user.uid + '/activities/' + this.state.activityKey).remove().then(() => {
                this.setState({
                    showDetail: !this.state.showDetail,
                    activity: null
                })
            })
        })
    }

    getIcon(uid) {
        if (uid === this.props.user.uid) {
            return 'person'
        }
        return null;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.list.length > 0 ?
                    <ScrollView>
                        <View style={styles.list}>
                            {this.props.list.map((activity, i) => (
                                <ListItem
                                    leftAvatar={{rounded: true, source: activity.val().image}}
                                    rightIcon={{name: this.getIcon(activity.val().owner.uid)}}
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
                                       onBackdropPress={()=>this.toggleCancel()}
                                       onBackButtonPress={()=>this.toggleCancel()}
                                       animationIn='slideInRight'
                                       animationOut='slideOutLeft'
                                       backdropColor={'#2E3347'}
                                       backdropOpacity={0}
                                >
                                    <View style={styles.modalContainer}>
                                        <Image source={this.state.activity.image}
                                               style={styles.image}/>
                                        <View style={styles.closeIcon}>
                                            <TouchableOpacity onPress={()=>this.toggleCancel()}>
                                                <Icon name="close" size={28} color="#2E3347"/>
                                            </TouchableOpacity>
                                        </View>
                                        <ActivityDetail act={this.state.activity}
                                                        names={this.state.participantsNames}
                                                        num={this.state.participantNum}/>
                                        {this.state.activity.owner.uid === this.props.user.uid ?
                                            <Button
                                                style={styles.button}
                                                buttonStyle={{
                                                    borderRadius: 0,
                                                    marginLeft: 0,
                                                    marginRight: 0,
                                                    marginBottom: 0,
                                                    backgroundColor: "#FF4A11"
                                                }}
                                                title="Delete"
                                                onPress={()=>this.deleteActivity()}
                                            /> :

                                            <Button
                                                style={styles.button}
                                                buttonStyle={{
                                                    borderRadius: 0,
                                                    marginLeft: 0,
                                                    marginRight: 0,
                                                    marginBottom: 0,
                                                    backgroundColor: "#FF4A11"
                                                }}
                                                title="Quit"
                                                onPress={()=>this.quitActivity()}
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
        flex: 1.2,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },

    modalContainer: {
        height: MODAL_HEIGH,
        width: 'auto',
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