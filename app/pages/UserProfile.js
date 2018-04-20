import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert
} from 'react-native';
import {firebaseRef} from '../servers/Firebase';
import {Actions} from 'react-native-router-flux';


export default class userProfile extends Component {

    goHome(){
        Actions.home()
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
            <View style={styles.container}>
                <Image style={{width: 50, height: 50}} source={{uri:this.props.user.photoURL}}/>
                <Text style={styles.text}>Hello {this.props.user.displayName}</Text>
                <Text style={styles.text}> {this.props.user.uid}</Text>
                <Text style={styles.text}> {this.props.user.gender}</Text>
                <Text style={styles.text}> {this.props.user.age_range}</Text>
                <Button title='home' color="#841584" onPress={this.goHome}/>
                <Button title='logout' color="#841584" onPress={this.logout}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    }
})