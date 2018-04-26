import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import {Icon} from 'react-native-elements';


import FetchLocation from '../components/FetchLocation';
import Map from '../components/Map'
//import {firebaseRef} from "../servers/Firebase";

let activityInfo = {
    category: 'food',
    title: 'Yo Sushi',
    description: 'eating',
    time: {
        date: '01-05-2018',
        startTime: '14:00',
    },
    location: {
        longitude: '123',
        latitude: '456',
    },
    owner: 'djflksdjdltj',
    participants: {},
    status: 'open',
};

export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            usersPlaces: [],
            pinLocation:null,
        }
    };

    // createActivity(activity) {
    //     firebaseRef.database().ref('activities').push().set(activity).then(() => {
    //         console.log('adding location');
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };
    //
    // updateActivity(activity) {
    //     firebaseRef.database().ref('activities').update(activity).then(() => {
    //         console.log('adding location');
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };

    getUserLocationHandler = () => {

        navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    userLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.01,
                    }
                });

                //this.createActivity(activityInfo);

                // fetch('https://compsci-732-project.firebaseio.com/place.json', {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         latitude: position.coords.latitude,
                //         longitude: position.coords.longitude,
                //     })
                // })
                //     .then(res => console.log(res))
                //     .catch(err => console.log(err));
            },
            err => console.log(err)
        );

    };

    getUsersPlacesHandler = () => {
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
                {/*This is the body in the home view*/}
                <View style={styles.body}>
                    {/*This is initiate screen view*/}
                    <View styele={{overflow: 'hidden'}}>


                    </View>

                    {/*This is activities screen view*/}
                    <View styele={{top: window.height, bottom: -window.height}}>

                        <FetchLocation onGetLocation={this.getUserLocationHandler}/>

                        {/*<View>*/}
                        {/*<Button title={"Get User Places"} onPress={this.getUsersPlacesHandler()}/>*/}
                        {/*</View>*/}
                        <Map
                            userLocation={this.state.userLocation}
                            usersPlaces={this.state.usersPlaces}
                            pinLocation={this.state.pinLocation}
                        />
                    </View>

                </View>
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
                <Icon name="account-circle" size={25} color="#808080"/>
            </TouchableOpacity>
        </View>,
});

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