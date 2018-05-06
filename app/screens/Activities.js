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
    AsyncStorage, Alert,
} from 'react-native';

import {Icon, Divider, Button} from 'react-native-elements';

import Modal from "react-native-modal";
import MapView from "react-native-maps";
import {firebaseRef} from "../servers/Firebase";
import ActivityDetail from '../components/ActivityDetail'

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
            user: null,
            activities: null,
            actCards: [],
            region: {
                latitude: -36.84705474575118,
                longitude: 174.76480531990111,
                latitudeDelta: 0.03,
                longitudeDelta: 0.01,
            },
            isModalVisible: false,
            act: null,
            participantsNames: '',
            participantsNum: 0,
            isJoined: false,
            isOwner: false,
            participantKeys: [],


        };
        // this.listenForClick = this.listenForClick.bind(this);
        // this.joinAct = this.joinAct.bind(this);
        // this.hideActDetail = this.hideActDetail.bind(this)
    };

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        this.getUserLocation();
        this.listenForAct();
        this.listenForAnimation();
        this.getUserInfo();
    };

    getUserInfo() {
        AsyncStorage.getItem('user', (err, result) => {
            this.setState({
                user: JSON.parse(result)
            });
        })
    }

    listenForAnimation() {
        this.animation.addListener(({value}) => {
            let index = Math.floor(value / (CARD_WIDTH + 2 * CARD_MARGIN) + 0.3);
            CARD_INDEX = index;
            if (index >= this.state.actCards.length) {
                index = this.state.actCards.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const {location} = this.state.actCards[index];
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
            const cardsArray = [];
            let count = 0;
            for (const key in activities) {
                const participantsArray = [];
                for (const keyB in activities[key].participants) {
                    participantsArray.push({
                        uid: activities[key].participants[keyB].uid,
                        username: activities[key].participants[keyB].username,
                    });
                }

                cardsArray.push({
                    actNum: count,
                    id: activities[key].id,
                    location: {
                        latitude: activities[key].location.latitude,
                        longitude: activities[key].location.longitude,
                    },
                    title: activities[key].title,
                    category: activities[key].category,
                    description: activities[key].description,
                    time: {
                        date: activities[key].time.date,
                        time: activities[key].time.time,
                    },
                    owner: {
                        uid: activities[key].owner.uid,
                        username: activities[key].owner.username,
                    },
                    status: activities[key].status,
                    image: activities[key].image,
                    participants: participantsArray
                });
                count++;
            }
            this.setState({
                actCards: cardsArray
            });
        });
    }

    listenForClick(act) {
        const actNum = act.actNum;
        if (actNum !== CARD_INDEX) {
            const value = actNum * (CARD_WIDTH + 2 * CARD_MARGIN);
            this.scrollView.getNode().scrollTo({x: value, y: 0, animated: true})
        } else {
            this.setState({isModalVisible: true});
            actRef.child(act.id).on('value', (activity) => {

                this.setState({
                    act: activity.val(),
                });
                if (activity.val().owner) {
                    this.checkOwner(activity.val().owner);
                    this.getParticipantsUsername(activity.val().participants)
                }

            });
        }
    }

    checkOwner(owner) {
        let isOwner = false;

        if (owner.uid === this.state.user.uid) {
            isOwner = true;
        }
        this.setState({
            isOwner: isOwner,
        });
    }

    listenForMarkerClick(act) {
        let actNum = act.actNum;
        let value = actNum * (CARD_WIDTH + 2 * CARD_MARGIN);
        this.scrollView.getNode().scrollTo({x: value, y: 0, animated: false})
    }

    joinAct(act) {
        const partInfo = {
            uid: this.state.user.uid,
            username: this.state.user.username
        };
        let actInfo = {
            actId: act.id
        };
        firebaseRef.database().ref('activities/' + act.id + '/participants/' + this.state.user.uid).set(partInfo).then(() => {
            firebaseRef.database().ref('users/' + this.state.user.uid + '/activities/' + act.id).set(actInfo).then(() => {
                this.setState({
                    isJoined: true
                })
            })
        }).catch((error) => {
            console.log(error);
        });
    };

    quitAct(act) {
        firebaseRef.database().ref('activities/' + act.id + '/participants/' + this.state.user.uid).remove().then(() => {
            firebaseRef.database().ref('users/' + this.state.user.uid + '/activities/' + act.id).remove().then(() => {
                this.setState({
                    isJoined: false
                })
            })
        })
    };

    deleteAct(act){
        // this.hideActDetail();
        // const participantsList = this.state.participantKeys.map(key => {
        //     return firebaseRef.database().ref('users/'+key+'/activities/'+act.id).remove()
        // });
        // Promise.all(participantsList)
        //     .then(() => {
        //         firebaseRef.database().ref('activities/' +  this.state.act.id).remove()
        //     })
        //     .catch(err => {
        //         Alert.alert(err)
        //     });
    };

    getParticipantsUsername(participants) {
        let count = 0;
        let names = '';
        let isJoined = false;
        let keys=[];
        for (const key in participants) {
            if (participants[key].uid === this.state.user.uid) {
                isJoined = true;
            }

            if (count === 0) {
                names += participants[key].username;
            } else {
                names += ', ' + participants[key].username;
            }
            count++
            keys.push(key)
        }
        this.setState({
            participantsNames: names,
            participantNum: count,
            isJoined: isJoined,
            participantKeys:keys,
        });


    }

    hideActDetail() {
        this.setState({isModalVisible: false})
    }

    render() {
        const interpolations = this.state.actCards.map((act, index) => {
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
                    {this.state.actCards.map((act, index) => {
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
                                                this.listenForMarkerClick(act)
                                            }}
                                            onPress={(event) => {
                                                event.stopPropagation();
                                                this.listenForMarkerClick(act)
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
                    {this.state.actCards.map((act, index) => {
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
                                                  onPress={() => this.listenForClick(act)}>
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

                {this.state.act ?
                    <Modal isVisible={this.state.isModalVisible}
                           onBackdropPress={() => this.hideActDetail}
                           onBackButtonPress={() => this.hideActDetail}
                           backdropColor={'#FFFFFF'}
                           backdropOpacity={0}
                    >
                        <View style={styles.modalContainer}>

                            <Image source={this.state.act.image} style={styles.image}/>

                            <View style={styles.closeIcon}>
                                <TouchableOpacity onPress={() => this.hideActDetail()}>
                                    <Icon name="close" size={28} color="#FFFFFF"/>
                                </TouchableOpacity>
                            </View>
                            <ActivityDetail act={this.state.act} names={this.state.participantsNames}
                                            num={this.state.participantNum}/>
                            {this.state.isOwner === true ?
                                <Button
                                    style={styles.button}
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,
                                        backgroundColor: "#FF4A11",
                                    }}
                                    title='You can delete activity in schedule'
                                    onPress={() => this.deleteAct(this.state.act)}
                                />
                                : this.state.isJoined === true ?
                                    <Button
                                        style={styles.button}
                                        buttonStyle={{
                                            borderRadius: 0,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginBottom: 0,
                                            backgroundColor: "#FF4A11",
                                        }}
                                        title='Quit'
                                        onPress={() => this.quitAct(this.state.act)}
                                    />
                                    : <Button
                                        style={styles.button}
                                        buttonStyle={{
                                            borderRadius: 0,
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginBottom: 0,
                                            backgroundColor: "#1DA3F2",
                                        }}
                                        title='Join Now'
                                        onPress={() => this.joinAct(this.state.act)}
                                    />
                            }
                        </View>
                    </Modal>
                    :
                    <View/>
                }
            </View>

        );
    }
}

let load = true;

Activities.navigationOptions = ({navigation}) => ({
    title: 'Activities',
    headerStyle: {
        elevation: 3,
        backgroundColor: '#1DA1F2',
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    },
    headerTitleStyle: {textAlign: "center", flex: 1,},
    headerTintColor: '#fff',
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity
                onPress={() => {
                    if (load) {
                        load = false;
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
        flex: 1.2,
        width: "100%",
        height: "100%",
        alignSelf: "center",
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

    closeIcon: {
        position: "absolute",
        right: 5,
        top: 5,
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