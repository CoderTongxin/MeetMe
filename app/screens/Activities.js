import React from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class Activities extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to Activities screen!
                </Text>
            </View>
        );
    }
}

Activities.navigationOptions = ({navigation}) => ({
    title: 'Activities',
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="account-circle" size={25} color="#808080" />
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