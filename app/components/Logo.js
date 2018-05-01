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
                <Image  style={{width:80, height: 80}}
                        source={require('../../resource/images/logo.png')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        marginVertical:10
    },
    logoText : {
        marginVertical: 15,
        fontSize:20,
        color:'#000000'
    }
});