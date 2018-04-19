import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topNavBar}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../images/MeetMe.png')}
                    />
                    <Text style={styles.topNavText}>Meet Me</Text>
                    <View style={styles.topNavItem}>
                        <TouchableOpacity>
                            <MaterialIcon style={styles.navItem} name="account-circle" size={25} color="#808080"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>

                </View>
                <View style={styles.tabBar}>

                    <TouchableOpacity style={styles.tabItem}>
                        <MaterialIcon name="alarm-add" size={24} color="#808080"/>
                        <Text style={styles.tabTitle}>Initiate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabItem}>
                        <MaterialIcon name="local-activity" size={24} color="#808080"/>
                        <Text style={styles.tabTitle}>Activities</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabItem}>
                        <MaterialIcon name="schedule" size={24} color="#808080"/>
                        <Text style={styles.tabTitle}>Schedule</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topNavBar: {
        height: 55,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingTop: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    topNavText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },

    topNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    navItem: {

    },

    body: {
        flex: 1,
    },

    tabBar: {
        backgroundColor: 'white',
        height: 50,
        borderTopWidth: 0.5,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabTitle: {
        fontSize: 11,
        color: '#808080'
    },

});
