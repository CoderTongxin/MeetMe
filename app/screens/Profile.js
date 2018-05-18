import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';
import Header from 'react-navigation/src/views/Header/Header';
import {Avatar, Button, Icon} from 'react-native-elements';
import {firebaseRef} from "../servers/Firebase";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            this.setState({
                user: JSON.parse(result)
            });
        });
    }

    logout() {
        firebaseRef.auth().signOut().then(function () {
            AsyncStorage.removeItem('user', () => {
                this.props.navigation.navigate('Login');
            })
        }.bind(this)).catch((error) => {
            Alert.alert(error.message)
        });
    }


    render() {
        return (
            <ImageBackground
                source={require('../../assets/image/square.png')}
                style={{width: '100%', height: '100%'}}
            >
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
                                    backgroundColor: '#1DA1F2',
                                    shadowColor: "#000",
                                    shadowRadius: 2,
                                    shadowOpacity: 0.3,
                                    shadowOffset: {x: 2, y: -2},
                                },
                                headerTitleStyle: {textAlign: "center", flex: 1},
                                headerTintColor: '#fff',
                                title: 'Profile',
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

                    <View style={styles.contentContainer}>
                        <View style={styles.headContainer}>
                            <View style={styles.avatarContainer}>
                                <Avatar
                                    xlarge
                                    rounded
                                    source={{
                                        uri: this.state.user.avatar,
                                    }}
                                    activeOpacity={0.7}
                                    overlayContainerStyle={{backgroundColor: 'transparent'}}
                                />
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.usernameText}>
                                        {this.state.user.username}
                                    </Text>
                                </View>
                                {this.state.user.email ?
                                    <View style={styles.textContainer}>
                                        <Icon
                                            name='mail-outline'
                                            size={17}
                                            color='#000'
                                        />
                                        <Text style={styles.emailText}>
                                            {this.state.user.email}
                                        </Text>

                                    </View> :
                                    <View/>
                                }
                                <View style={styles.cardContainer}>
                                    <Image style={{width: SCREEN_WIDTH * 0.8, height: 200}}
                                           source={require('../../assets/image/finished.gif')}/>
                                </View>
                            </View>
                            <Button
                                style={styles.button}
                                buttonStyle={{
                                    width: SCREEN_WIDTH * 0.8,
                                    borderRadius: 0,
                                    marginLeft: 0,
                                    marginRight: 0,
                                    marginBottom: 0,
                                    backgroundColor: "#FF4A11"
                                }}
                                title='Log out'
                                onPress={this.logout}
                            />

                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SCREEN_HEIGHT
    },
    contentContainer: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    headContainer: {
        marginTop: 5,
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatarContainer: {
        elevation: 2,
        backgroundColor: "transparent",
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        marginVertical: 5
    },
    infoContainer: {
        alignItems: 'center',
    },
    usernameText: {
        fontFamily: 'bold',
        fontSize: 25,
        color: '#2E3347',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#2E3347',
    },
    activityContainer: {
        marginTop: 15,
    },

    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    cardContainer: {
        elevation: 2,
        backgroundColor: "#FFF",
        marginVertical: 15,
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    },
    button: {
        elevation: 2,
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    }
});