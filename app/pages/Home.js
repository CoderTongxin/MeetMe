import React,{Component}from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, Button} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FetchLocation from '../components/FetchLocation';
import UsersMap from '../components/Map'

export default class Home extends Component {

    state = {
        userLocation: null,
        usersPlaces: [],
    };

    getUserLocationHandler = () => {

        navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    userLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });
                fetch('https://compsci-732-project.firebaseio.com/place.json', {
                    method: 'POST',
                    body: JSON.stringify({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            },
            err => console.log(err)
        );

    };

    getUserPlacesHandler = () => {
        fetch('https://compsci-732-project.firebaseio.com/place.json')
            .then(res => res.json())
            .then(parsedRes => {
                const placesArray = [];
                for (const key in parsedRes) {
                    placesArray.push({
                        latitude: parsedRes[key].latitude,
                        longitude: parsedRes[key].longitude,
                        id: key
                    });
                }
                this.setState({
                    usersPlaces: placesArray
                });
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <View style={styles.container}>
                {/*This is the top navigation bar*/}
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

                {/*This is the body in the home view*/}
                <View style={styles.body}>
                    <View>
                        <Button title="Get Users Places" onPress={this.getUserPlacesHandler}/>
                    </View>
                    <FetchLocation onGetLocation={this.getUserLocationHandler}/>
                    <UsersMap
                        userLocation={this.state.userLocation}
                        usersPlaces={this.state.usersPlaces}
                    />
                </View>

                {/*This is the tap bar*/}
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
        height: 60,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingTop: 25,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    topNavText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },

    topNavItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    navItem: {},

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
