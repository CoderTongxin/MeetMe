import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, AsyncStorage, ImageBackground} from 'react-native';
import Header from 'react-navigation/src/views/Header/Header';
import {Icon, Card, ListItem, Button, Divider} from 'react-native-elements';
import MapView from 'react-native-maps';
import {firebaseRef} from "../servers/Firebase";

const {width, height} = Dimensions.get("window");
const MAP_HEIGHT = height / 4;
const MAP_WIDTH = width - 100;


export default class ActivityInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
        }
    }

    componentWillMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        AsyncStorage.getItem('user', (err, result) => {
            this.setState({
                user: JSON.parse(result)
            });
        })
    }

    joinAct(actInfo) {
        const partInfo = {
            uid: this.state.user.uid,
            username: this.state.user.username
        };

        firebaseRef.database().ref('activities/' + actInfo.id + '/participants/' + this.state.user.uid).set(partInfo).then(() => {
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        const {params} = this.props.navigation.state;
        const actInfo = params ? params.actInfo : null;
        // const participants = actInfo.participants.Map((participant)=>{
        //         return(
        //             participant.username + ', '
        //         )
        //     });
        return (
            <View style={styles.container}>

                {/*The key part to rewrite Header and make a icon to close the modal screen*/}
                <Header
                    scene={{index: 0}}
                    scenes={[{index: 0, isActive: true}]}
                    navigation={{state: {index: 0}}}
                    getScreenDetails={() => ({
                        options: {
                            headerStyle: {
                                elevation: 2,
                                shadowOpacity: 1,
                                backgroundColor: '#2E3347',
                            },
                            headerTitleStyle: {textAlign: "center", flex: 1},
                            headerTintColor: '#fff',
                            title: 'Activity Info',
                            headerLeft: (<View></View>),
                            headerRight: (
                                <View style={{paddingRight: 10}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                        <Icon name="close" size={25} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })}
                />

                {/*Edit here to add any functions*/}
                <View style={styles.cardContainer}>
                    <Image source={actInfo.image} style={styles.image}/>
                    <View style={styles.actInfo}>
                        <Text >
                            {actInfo.title}
                        </Text>
                        <Divider/>
                        <Text>
                            Activity Category: {actInfo.category}
                        </Text>
                        <Text>
                            Activity Date: {actInfo.time.date}
                        </Text>
                        <Text>
                            Activity Time: {actInfo.time.time}
                        </Text>
                        <Text>
                            Activity Creator: {actInfo.owner.username}
                        </Text>
                        <Text>
                            Activity Participants: Jack Tester, Tom Tester, James Tester
                        </Text>
                        <Text>
                            Activity Description: {actInfo.description}
                        </Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: actInfo.location.latitude,
                                longitude: actInfo.location.longitude,
                                latitudeDelta: 0.003,
                                longitudeDelta: 0.001,
                            }}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: actInfo.location.latitude,
                                    longitude: actInfo.location.longitude,
                                    latitudeDelta: 0.003,
                                    longitudeDelta: 0.001,
                                }}
                                key={actInfo.actNum}
                                actId={actInfo.key}
                            />
                        </MapView>

                    </View>
                    <Button
                        style={styles.button}
                        backgroundColor='#03A9F4'
                        fontFamily='Lato'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Join Now'
                        onPress={() => this.joinAct(actInfo)}
                    />
                </View>
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:'#A6A6A6',
        },

        image: {
            flex: 2,
            width: "100%",
            height: "100%",
            alignSelf: "center",
        },

        actInfo: {
            flex: 3,
            margin: 10,
        },
        mapContainer: {
            flex: 3,
            margin: 10,
            elevation: 2,
            backgroundColor: "#FFF",
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowOffset: { x: 2, y: -2 },
        },
        map: {
            width: '100%',
            height: '100%',
        },

        cardContainer: {
            flex: 1,
            elevation: 2,
            backgroundColor: "#FFF",
            margin: 15,
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowOffset: { x: 2, y: -2 },
        },

        cardContent: {
            flex: 1,
            justifyContent: 'space-between'
        },
        button:{
            marginHorizontal:10,
            marginBottom:10,
            elevation: 2,
            backgroundColor: "#FFF",
            shadowColor: "#000",
            shadowRadius: 5,
            shadowOpacity: 0.3,
            shadowOffset: { x: 2, y: -2 },}
    });