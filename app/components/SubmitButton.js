import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';



export default class SubmitButton extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
                <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                    <Text style={styles.buttonText} >{this.props.type}</Text>
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({


    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }

});