import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image  style={{width:70, height: 70}}
                        source={require('../../resource/images/MeetMe.png')}/>
                <Text style={styles.logoText}>Welcome to Meet Me</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'flex-end',
        alignItems: 'center'
    },
    logoText : {
        marginVertical: 15,
        fontSize:20,
        color:'#000000'
    }
});