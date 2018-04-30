import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import FetchLocation from '../components/FetchLocation';
import Map from '../components/Map'
import {firebaseRef} from "../servers/Firebase";

const db = firebaseRef.database();
const actRef = db.ref("activities");

export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            activities: null,
            usersPlaces: [],
            actPlaces:[]
        };
    };


    componentDidMount() {
        this.listenForAct();
    };


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
            },
            err => console.log(err)
        );

    };

    listenForAct() {
        actRef.on('value', (snap) => {
            const activities = snap.val();

            this.setState({
                activities: activities
            });
            const placesArray = [];
            for (const key in activities) {
                placesArray.push({
                    latitude: activities[key].location.latitude,
                    longitude: activities[key].location.longitude,
                    title:activities[key].title,
                    description:activities[key].description,
                    id: key
                });
            }
            this.setState({
                actPlaces: placesArray
            });
        });


    }

    render() {


        return (
            <View style={styles.container}>

                <View style={styles.body}>
                    <FetchLocation onGetLocation={this.getUserLocationHandler}/>

                    <Map
                        userLocation={this.state.userLocation}
                        actPlaces={this.state.actPlaces}
                        activities={this.state.activities}
                    />

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