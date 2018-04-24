import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


export default class ActivitiesDetail extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to ActivitiesDetail screen!
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
});