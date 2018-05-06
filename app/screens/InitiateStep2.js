import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Text
} from 'react-native';
import {Button, Icon} from 'react-native-elements'
import t from 'tcomb-form-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const dateFormat = require('dateformat');

const Form = t.form.Form;

const options = {
    order: ['date', 'time'],
    fields: {
        date: {
            mode: 'date',
            error: 'Invalid date',
            config: {
                format: ((date) => dateFormat(date, "dddd, mmmm d, yyyy")),
            },
        },
        time: {
            mode: 'time',
            error: 'Invalid time',
            config: {
                format: ((time) => dateFormat(time, "shortTime")),
            },
        }
    },
};


const Activity = t.struct({
    date: t.Date,
    time: t.Date,
});


export default class Initiate extends React.Component {

    handleClick(actInfo) {
        const value = this._form.getValue();
        if (value) {
            this.props.navigation.navigate(("InitiateStep3"), {actInfo: actInfo, actTime: value});
        }
    };

    render() {
        const {params} = this.props.navigation.state;
        const actInfo = params ? params.actInfo : null;
        return (
            <ImageBackground
                source={require('../../assets/image/colorful.jpg')}
                style={{width: '100%', height: '100%'}}
            >
                <View style={styles.container}>
                    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                Step 2: Set the Time
                            </Text>

                        </View>
                        <View style={styles.formContainer}>

                            <Form
                                ref={c => this._form = c}
                                type={Activity}
                                options={options}
                            />


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
                                onPress={() => this.handleClick(actInfo)}
                            />

                        </View>
                    </KeyboardAwareScrollView>
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
    headerLeft:
        <View style={{paddingLeft: 10}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#FFFFFF"/>
            </TouchableOpacity>
        </View>,
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

    },

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

    formContainer: {
        padding: 20,
        elevation: 2,
        backgroundColor: "#FFF",
        margin: 15,
        shadowColor: "#000",
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
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