import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
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

Initiate.navigationOptions = ({navigation}) => ({
    title: 'Initiate',
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity>
                <Icon name="account-circle" size={25} color="#808080" onPress={() => navigation.navigate('Profile')}/>
            </TouchableOpacity>
        </View>,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center'
    },
});