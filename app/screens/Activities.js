import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Button,
    ScrollView,
    Animated,
    Image,
    Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';

import MapView from "react-native-maps";
import {firebaseRef} from "../servers/Firebase";

const db = firebaseRef.database();
const actRef = db.ref("activities");


const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            activities: null,
            usersPlaces: [],
            actPlaces: [],
            region: {
                latitude: -36.84705474575118,
                longitude: 174.76480531990111,
                latitudeDelta: 0.03,
                longitudeDelta: 0.01,
            },
        };
    };

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.listenForAct();
        this.animation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.actPlaces.length) {
                index = this.state.actPlaces.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const {location} = this.state.actPlaces[index];
                    this.map.animateToRegion(
                        {
                            ...location,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
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
                    location: {
                        latitude: activities[key].location.latitude,
                        longitude: activities[key].location.longitude,
                    },
                    title: activities[key].title,
                    description: activities[key].description,
                    id: key
                });
            }
            this.setState({
                actPlaces: placesArray
            });
        });


    }

    render() {
        const interpolations = this.state.actPlaces.map((act, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];

            const cardScale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 1.1, 1],
                extrapolate: "clamp",
            });

            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });

            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return {scale, opacity, cardScale};
        });

        return (
            <View style={styles.container}>

                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.state.actPlaces.map((act, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker coordinate={act.location}
                                            key={index}
                                            actId={act.key}
                                            title={act.title}
                                            description={act.description}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]}/>
                                    <View style={styles.marker}/>
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        {useNativeDriver: true}
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.state.actPlaces.map((act, index) => {
                        const cardScale = {
                            transform: [
                                {
                                    scale: interpolations[index].cardScale,
                                },
                            ],
                        };
                        return (
                            <Animated.View
                                style={[styles.card, cardScale]}
                                key={index}
                                actId={act.key}
                            >
                                {/*<Image*/}
                                {/*source={marker.image}*/}
                                {/*style={styles.cardImage}*/}
                                {/*resizeMode="cover"*/}
                                {/*/>*/}
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardTitle}>
                                        {act.title}
                                    </Text>
                                    <Text numberOfLines={5} style={styles.cardDescription}>
                                        {act.description}
                                    </Text>
                                </View>
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>
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

    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {

        paddingRight: CARD_WIDTH*1.3,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});