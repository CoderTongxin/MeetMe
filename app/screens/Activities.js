import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';

import {Icon, Divider, Button} from 'react-native-elements';

import Modal from "react-native-modal";
import MapView from "react-native-maps";
import {firebaseRef} from "../servers/Firebase";

const db = firebaseRef.database();
const actRef = db.ref("activities");
const dateFormat = require('dateformat');

const {width, height} = Dimensions.get("window");
const heightFactor = 6;
const widthFactor = 4;
const CARD_HEIGHT = height / heightFactor;
const CARD_WIDTH = width / widthFactor;
const CARD_MARGIN = CARD_WIDTH / ((widthFactor - 1) * 2);
const MODAL_HEIGH = height * 0.8;
const MODAL_WIDTH = width * 0.8;
let CARD_INDEX = 0;

export default class Activities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: null,
            actPlaces: [],
            region: {
                latitude: -36.84705474575118,
                longitude: 174.76480531990111,
                latitudeDelta: 0.03,
                longitudeDelta: 0.01,
            },
            isModalVisible: false,
            act: {
                actNum: null,
                location: {
                    latitude: null,
                    longitude: null,
                },
                title: null,
                category: null,
                description: null,
                id: null,
                time: {
                    date: null,
                    time: null,
                },
                owner: {
                    uid: null,
                    username: null,
                },
                status: null,
                image: {uri: "https://static.boredpanda.com/blog/wp-content/uploads/2015/05/food-cubes-raw-lernert-sander-volkskrant-6.jpg"},
                participants: null
            },
        };
        this.ListenForClick = this.ListenForClick.bind(this)
    };

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.getUserLocation();
        this.listenForAct();
        this.listenForAnimation();
    };

    listenForAnimation() {
        this.animation.addListener(({value}) => {
            let index = Math.floor(value / (CARD_WIDTH + 2 * CARD_MARGIN) + 0.3);
            CARD_INDEX = index;
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
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition(position => {
                if (position.coords.latitude) {
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.01,
                        }
                    });
                }
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
            let count = 0;
            for (const key in activities) {
                const participantsArray = [];
                for (const keyB in activities[key].participants) {
                    participantsArray.push({
                        uid: activities[key].participants[keyB].uid,
                        username: activities[key].participants[keyB].username,
                    });
                }
                let image = null;

                if (activities[key].category === 'Food') {
                    image = {uri: "https://static.boredpanda.com/blog/wp-content/uploads/2015/05/food-cubes-raw-lernert-sander-volkskrant-6.jpg"};
                } else if (activities[key].category === 'Sport') {
                    image = {uri: "http://www.youthvillage.co.za/wp-content/uploads/2014/10/football-fiesta-salisbury.jpg"};
                } else if (activities[key].category === 'Shopping') {
                    image = {uri: "http://freedesignfile.com/upload/2016/12/Happy-shopping-woman-HD-picture.jpg"};
                } else if (activities[key].category === 'Movie') {
                    image = {uri: "https://st.depositphotos.com/2185383/4533/v/950/depositphotos_45330093-stock-illustration-cinema-concept.jpg"};
                } else if (activities[key].category === 'Study') {
                    image = {uri: "http://www.nebrija.com/medios/actualidadnebrija/wp-content/uploads/sites/2/2016/11/bbva-educacion-1920x0-c-f-787x459.jpg"};
                } else if (activities[key].category === 'Game') {
                    image = {uri: "https://images.unsplash.com/10/wii.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=592b3b24ffafc20dbe8b0a1df97ef5c6&w=1000&q=80"};
                } else if (activities[key].category === 'Pet') {
                    image = {uri: "http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03170233/cute-cat.jpg"};
                } else {
                    image = {uri: "https://static1.squarespace.com/static/51277219e4b08376dc025505/t/55f17df3e4b0d3922cc4c416/1441889779581/?format=300w"};
                }

                placesArray.push({
                    actNum: count,
                    location: {
                        latitude: activities[key].location.latitude,
                        longitude: activities[key].location.longitude,
                    },
                    title: activities[key].title,
                    category: activities[key].category,
                    description: activities[key].description,
                    id: key,
                    time: {
                        date: activities[key].time.date,
                        time: activities[key].time.time,
                    },
                    owner: {
                        uid: activities[key].owner.uid,
                        username: activities[key].owner.username,
                    },
                    status: activities[key].status,
                    image: image,
                    participants: {participantsArray}
                });
                count++;
            }
            this.setState({
                actPlaces: placesArray
            });
        });


    }

    ListenForClick(act) {
        const actNum = act.actNum;
        if (actNum !== CARD_INDEX) {
            const value = actNum * (CARD_WIDTH + 2 * CARD_MARGIN);
            this.scrollView.getNode().scrollTo({x: value, y: 0, animated: true})
        } else {
            this.setState({
                act: act,
            });
            this.state.isModalVisible = true
        }
    }

    ListenForMarkerClick(act) {
        let actNum = act.actNum;
        let value = actNum * (CARD_WIDTH + 2 * CARD_MARGIN);
        this.scrollView.getNode().scrollTo({x: value, y: 0, animated: false})
    }

    joinAct(act) {
        const partInfo = {
            uid: this.state.user.uid,
            username: this.state.user.username
        };

        firebaseRef.database().ref('activities/' + act.id + '/participants/' + this.state.user.uid).set(partInfo).then(() => {
        }).catch((error) => {
            console.log(error);
        });
    };


    render() {
        const interpolations = this.state.actPlaces.map((act, index) => {
            const inputRange = [
                (index - 1) * (CARD_WIDTH + 2 * CARD_MARGIN),
                index * (CARD_WIDTH + 2 * CARD_MARGIN),
                (index + 1) * (CARD_WIDTH + 2 * CARD_MARGIN),
            ];

            const cardScale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 1.2, 1],
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
        let cardIndex;

        return (

            <View style={styles.container}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="light-content"
                />
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
                                            onSelect={() => {
                                                this.ListenForMarkerClick(act)
                                            }}
                                            onPress={(event) => {
                                                event.stopPropagation();
                                                this.ListenForMarkerClick(act)
                                            }}
                            >
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <View style={styles.marker}/>
                                    <Animated.View style={[styles.ring, scaleStyle]}/>
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    ref={c => this.scrollView = c}
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH + 2 * CARD_MARGIN}
                    onScroll={
                        Animated.event
                        ([{
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },],
                            {useNativeDriver: true}
                        )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.state.actPlaces.map((act, index) => {
                        cardIndex = index;
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
                                <TouchableOpacity style={styles.container} id={index}
                                                  onPress={() => this.ListenForClick(act)}>
                                    <Image
                                        source={act.image}
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.textContent} key={index}>

                                        <Text numberOfLines={1} style={styles.cardTitle}>
                                            {act.title}
                                        </Text>
                                        <Divider/>
                                        <Text numberOfLines={1} style={styles.cardDescription}>
                                            {act.time.time}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.cardDescription}>
                                            {dateFormat(act.time.date, "d mmm yyyy")}
                                        </Text>

                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </Animated.ScrollView>

                <Modal isVisible={this.state.isModalVisible}
                       onBackdropPress={() => this.setState({isModalVisible:false})}
                       onBackButtonPress={() => this.setState({isModalVisible:false})}
                       backdropColor={'#2E3347'}
                       backdropOpacity={0}
                >
                    <View style={styles.modalContainer}>
                        <Image source={this.state.act.image} style={styles.image}/>
                        <View style={styles.closeIcon}>
                            <TouchableOpacity onPress={() => this.setState({isModalVisible:false})}>
                                <Icon name="close" size={28} color="#2E3347"/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actInfo}>
                            <Text>
                                {this.state.act.title}
                            </Text>
                            <Divider/>
                            <Text>
                                Activity Category: {this.state.act.category}
                            </Text>
                            <Text>
                                Activity Date: {this.state.act.time.date}
                            </Text>
                            <Text>
                                Activity Time: {this.state.act.time.time}
                            </Text>
                            <Text>
                                Activity Creator: {this.state.act.owner.username}
                            </Text>
                            <Text>
                                Activity Participants: Jack Tester, Tom Tester, James Tester
                            </Text>
                            <Text>
                                Activity Description: {this.state.act.description}
                            </Text>
                        </View>
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: this.state.act.location.latitude,
                                    longitude: this.state.act.location.longitude,
                                    latitudeDelta: 0.003,
                                    longitudeDelta: 0.001,
                                }}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: this.state.act.location.latitude,
                                        longitude: this.state.act.location.longitude,
                                        latitudeDelta: 0.003,
                                        longitudeDelta: 0.001,
                                    }}
                                    key={this.state.act.actNum}
                                    actId={this.state.act.key}
                                />
                            </MapView>

                        </View>
                        <Button
                            style={styles.button}
                            backgroundColor='#03A9F4'
                            fontFamily='Lato'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Join Now'
                            onPress={() => this.joinAct(this.state.act)}
                        />
                    </View>
                </Modal>
            </View>

        );
    }
}

let load=true;
Activities.navigationOptions = ({navigation}) => ({
    title: 'Activities',
    headerStyle: {
        elevation: 2,
        shadowOpacity: 1,
        backgroundColor: '#2E3347',
    },
    headerTitleStyle: {textAlign: "center", flex: 1,},
    headerTintColor: '#fff',
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity
                onPress={() => {
                    if(load){
                        load=false;
                        navigation.navigate('Profile');
                        setTimeout(() => {
                            load = true;
                        }, 700);
                    }
                }}>
                <Icon name='user' type='evilicon' size={28} color='#fff'/>
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
        height: CARD_HEIGHT * 1.6,
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
        alignSelf: "center",
    },
    endPadding: {
        paddingLeft: (width - (CARD_WIDTH + 2 * CARD_MARGIN)) / 2,
        paddingRight: (width - (CARD_WIDTH + 2 * CARD_MARGIN)) / 2,
    },
    card: {
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: CARD_MARGIN,
        marginVertical: CARD_HEIGHT * 0.25,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 5,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
        textAlign: "justify",
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
        shadowOffset: {x: 2, y: -2},
    },
    map: {
        width: '100%',
        height: '100%',
    },

    modalContainer: {
        height: MODAL_HEIGH,

        elevation: 2,
        backgroundColor: "#FFF",
        margin: 15,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    },

    closeIcon:{
        position: "absolute",
        right:5,
        top:5,
    },

    button: {
        marginHorizontal: 10,
        marginBottom: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    }
});