import React from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Platform,
    AsyncStorage,
    Dimensions
} from 'react-native';
import Header from 'react-navigation/src/views/Header/Header';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebaseRef} from "../servers/Firebase";
import Schedule from './Schedule'
import {
    TabViewAnimated,
    TabBar,
    SceneMap,
    TabViewPagerScroll,
    TabViewPagerPan,
} from 'react-native-tab-view'

const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = {
    height: 0,
    width: SCREEN_WIDTH,
};


const FirstRoute = () => <Schedule/>;
const SecondRoute = () => <Schedule/>;

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user: '',
            tabs: {
                index: 0,
                routes: [
                    {key: '1', title: 'my activity', count: 31},
                    {key: '2', title: 'joined activity', count: 86},
                ],
            },
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

    _handleIndexChange = index => {
        this.setState({
            tabs: {
                ...this.state.tabs,
                index,
            },
        })
    };


    _renderScene = SceneMap({
        1: FirstRoute,
        2: SecondRoute,
    });

    _renderHeader = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={styles.indicatorTab}
                renderLabel={this._renderLabel(props)}
                pressOpacity={0.8}
                style={styles.tabBar}
            />
        )
    };


    _renderLabel = props => ({route, index}) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(
            inputIndex => (inputIndex === index ? 'black' : 'gray')
        );
        const color = props.position.interpolate({
            inputRange,
            outputRange,
        });
        return (
            <View>
                <Animated.Text style={[styles.tabLabelText, {color}]}>
                    {route.count}
                </Animated.Text>
                <Animated.Text style={[styles.tabLabelNumber, {color}]}>
                    {route.title}
                </Animated.Text>
            </View>
        )
    };

    _renderPager = props => {
        return Platform.OS === 'ios' ? (
            <TabViewPagerScroll {...props} />
        ) : (
            <TabViewPagerPan {...props} />
        )
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/*The key part to rewrite Header and make a icon to close the modal screen*/}
                    <Header
                        scene={{index: 0}}
                        scenes={[{index: 0, isActive: true}]}
                        navigation={{state: {index: 0}}}
                        getScreenDetails={() => ({
                            options: {
                                headerTitleStyle: {textAlign: "center", flex: 1},
                                title: 'Profile',
                                headerLeft: (<View style={{paddingLeft: 10}}>
                                    <TouchableOpacity onPress={() => this.logout()}>
                                        <Icon name="sign-out" size={25} color="#808080"/>
                                    </TouchableOpacity>
                                </View>),
                                headerRight: (
                                    <View style={{paddingRight: 10}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                            <Icon name="close" size={25} color="#808080"/>
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
                                            name='envelope'
                                            size={15}
                                            color='#000'
                                        />
                                        <Text style={styles.emailText}>
                                            {this.state.user.email}
                                        </Text>

                                    </View> :
                                    <View/>
                                }
                            </View>
                            <View style={styles.activityContainer}>
                                <TabViewAnimated
                                    navigationState={this.state.tabs}
                                    renderScene={this._renderScene}
                                    renderPager={this._renderPager}
                                    renderHeader={this._renderHeader}
                                    onIndexChange={this._handleIndexChange}
                                    initialLayout={initialLayout}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(241,240,241,1)'
    },
    contentContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 5,
        height: '100%',
        alignItems: 'center',
        paddingVertical: 5
    },
    headContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatarContainer: {
        marginVertical: 5
    },
    infoContainer: {
        alignItems: 'center',
    },
    usernameText: {
        fontFamily: 'bold',
        fontSize: 25,
        color: 'rgba(98,93,144,1)',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    activityContainer: {
        marginTop: 15,
    },
    divider: {
        width: 320,
        borderWidth: 0.5,
        borderColor: 'rgba(222, 223, 226, 1)',
        marginHorizontal: 20,
        height: 1,
    },
    footerContainer: {
        flex: 1, justifyContent: 'flex-end'
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    tabContainer: {
        flex: 1,
        marginBottom: 12,
    },
    tabBar: {
        backgroundColor: '#EEE',
    },
    tabLabelNumber: {
        color: 'gray',
        fontSize: 12.5,
        textAlign: 'center',
    },
    tabLabelText: {
        color: 'black',
        fontSize: 22.5,
        fontWeight: '600',
        textAlign: 'center',
    },
    indicatorTab: {
        backgroundColor: 'transparent',
    },
});