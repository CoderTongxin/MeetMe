import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Initiate extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to Initiate screen!
                </Text>
                <Button
                    onPress={() => this.props.navigation.navigate(("MapView"))}
                    title="Open Map"
                    color="#841584"
                />

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