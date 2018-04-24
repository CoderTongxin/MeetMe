import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    Alert,
    ScrollView
} from 'react-native';
import {firebaseRef} from '../servers/Firebase';
import {Actions} from 'react-native-router-flux';
import { Avatar} from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class userProfile extends Component {

    constructor(props){
        super(props);
        this.goActivityList=this.goActivityList.bind(this)
    }


    goHome(){
        Actions.home();
    }
    goActivityList(){

        Actions.activityList({user:this.props.user});
    }
    logout(){
        firebaseRef.auth().signOut().then(function() {
            Actions.login()
        }, function(error) {
           Alert.alert(error.message)
        });
    }
    render() {
        return(
            //
            // <View style={styles.container}>
            //     <Image style={{width: 50, height: 50}} source={{uri:this.props.user.photoURL}}/>
            //     <Text style={styles.text}>Hello {this.props.user.displayName}</Text>
            //     <Text style={styles.text}> {this.props.user.uid}</Text>
            //     <Text style={styles.text}> {this.props.user.gender}</Text>
            //     <Button title='home' color="#841584" onPress={this.goHome}/>
            //     <Button title='logout' color="#841584" onPress={this.logout}/>
            //     <Button title='activities' color="#841584" onPress={this.goActivityList}/>
            // </View>
                    <View style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}>
                        <View style={styles.statusBar} />
                        <View style={styles.navBar}>
                            <Text style={styles.nameHeader}>
                                User Profile
                            </Text>
                        </View>
                        <ScrollView style={{flex: 1, marginBottom: 20}}>
                            <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white', borderRadius: 5, alignItems: 'center', marginHorizontal: 10, height: 250, marginBottom: 10}}>
                                <View style={{flex: 3, flexDirection: 'row'}}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Avatar
                                            width={145}
                                            height={145}
                                            source={{
                                                uri: this.props.user.photoURL,
                                            }}
                                            activeOpacity={0.7}
                                            avatarStyle={{borderRadius: 145/2}}
                                            overlayContainerStyle={{backgroundColor: 'transparent'}}
                                        />
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={{ flex: 1, marginTop: 10, justifyContent: 'center'}}>
                                            <Text style={{ fontFamily: 'bold', fontSize: 25, color: 'rgba(98,93,144,1)', marginLeft: -15}}>
                                                {this.props.user.displayName}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{width: 300, borderWidth: 0.5, borderColor: 'rgba(222, 223, 226, 1)', marginHorizontal: 20, height: 1, marginVertical: 10}} />
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                        <Button title='home' color="#841584" onPress={this.goHome}/>
                                         <Button title='logout' color="#841584" onPress={this.logout}/>
                                        <Button title='activities' color="#841584" onPress={this.goActivityList}/>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize:16
    },
    statusBar: {
        height: 10,
    },
    navBar: {
        height: 60,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignContent: 'center',
    },
    nameHeader: {
        color: 'black',
        fontSize: 25,
        marginLeft: 20
    }
})