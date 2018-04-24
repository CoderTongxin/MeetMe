import React from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Schedule extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to Schedule screen!
                </Text>
            </View>
        );
    }
}

Schedule.navigationOptions = ({navigation}) => ({
    title: 'Schedule',
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
        justifyContent:'center',
        alignItems:'center'
    },
});