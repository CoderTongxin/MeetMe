import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground, Text, Image, Dimensions,
} from 'react-native';
import {Button, Icon} from 'react-native-elements'

const {width, height} = Dimensions.get("window");
const CARD_HEIGHT = height / 3.5;
const CARD_WIDTH = width;


export default class Initiate extends React.Component {

    handleClick = () => {
        this.props.navigation.navigate(("InitiateStep1"));
    };

    render() {
        return (

            <ImageBackground
                source={require('../../assets/image/colorful.jpg')}
                style={{width: '100%', height: '100%'}}
            >
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            3 Steps To Create a New Activity
                        </Text>

                    </View>

                    <View style={styles.cardContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require('../../assets/image/initiateSmall.gif')}
                            />
                        </View>
                    </View>
                    <Button
                        style={styles.button}
                        buttonStyle={{
                            borderRadius: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            backgroundColor: "#1DA1F2"
                        }}
                        title='Next'
                        onPress={this.handleClick}
                    />
                </View>
            </ImageBackground>

        );
    }
}
let load = true;

Initiate.navigationOptions = ({navigation}) => ({
    title: 'Initiate',
    headerStyle: {
        elevation: 3,
        backgroundColor: '#1DA1F2',
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    },
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerTintColor: '#fff',
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity onPress={() => {
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
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20
    },

    textContainer: {},

    text: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: "bold",
        textAlign: 'center',
        fontFamily: 'regular',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 2
    },

    cardContainer: {
        elevation: 2,
        backgroundColor: "#FFF",
        marginVertical: 15,
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        height: CARD_HEIGHT,
    },

    imageContainer: {
        backgroundColor: "#FFF",
        // padding: 10,
        width: '100%',
        height: '100%',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    button: {
        elevation: 2,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    }
});