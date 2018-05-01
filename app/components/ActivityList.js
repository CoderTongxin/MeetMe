import React from 'react';

import {StyleSheet, View, TouchableHighlight, Text, ScrollView} from 'react-native';
import {
    ListItem,
    Button,
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
        this.initiateActivity=this.initiateActivity.bind(this)
    }
componentDidMount(){
        console.log(this.props.list)
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
        this.setState({
            showDetail: !this.state.showDetail,
            activity: activity
        })
    }
    initiateActivity(){
        this.props.navigation.navigate('Initiate')
    }
    deleteActivity() {
        firebaseRef.database().ref('activities').remove(this.state.activity.val().uid).then(()=>{
            console.log('success')
        }).catch((err)=>{
            console.log(err)
        })
    }

    getIcon(activity) {
        if(activity.val().owner.uid===this.props.user.uid){
            return 'person'
        }

    }

    render() {
        return (
            <ScrollView>
                {this.props.list.length>0 ?
                    <View style={styles.list}>
                        {this.props.list.map((activity, i) => (
                            <ListItem
                                leftAvatar={{rounded: true, source: this.chooseAvatar(activity.val().category)}}
                                rightIcon={{name:this.getIcon(activity)}}
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
                                animationIn='slideInLeft'
                                animationOut='slideOutRight'
                            >
                                <View style={{flex: 1}}>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 30
                                    }}>Hello {this.state.activity.val().category}!</Text>
                                    <Button
                                        title="Close"
                                        onPress={this.toggleCancel}
                                    />
                                    {this.state.activity.val().owner.uid === this.props.user.uid ?
                                        <Button
                                            title="Delete"
                                            onPress={this.deleteActivity}
                                        /> : <View/>}
                                </View>
                            </Modal> :
                            <View/>}
                    </View> :
                    <Notice/>
                }
            </ScrollView>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    list: {
        backgroundColor: '#fff',
    }
})