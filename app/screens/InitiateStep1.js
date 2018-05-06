import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text
} from 'react-native';
import {Button, Icon} from 'react-native-elements'
import t from 'tcomb-form-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.pickerTouchable.normal.height = 36;
stylesheet.pickerTouchable.error.height = 36;
stylesheet.textbox.normal.height = 108;
stylesheet.textbox.error.height = 108;

const Form = t.form.Form;

const options = {
    order: ['category', 'title', 'description'],
    fields: {
        category: {
            nullOption: {value: '', text: 'Please select activity type'},
            error: 'Please tell others what kind of activity you are initiating',
            stylesheet: stylesheet,
        },
        title: {
            placeholder: 'Please write an activity title',
            error: 'A beautiful title can attract people to join your activity',
        },
        description: {
            type: 'textarea',
            placeholder: 'Please write a brief activity description',
            multiline: true,
            stylesheet: stylesheet,
        },
    },
};

const Category = t.enums({
    Food: 'Food',
    Sport: 'Sport',
    Shopping: 'Shopping',
    Movie: 'Movie',
    Study: 'Study',
    Game: 'Game',
    Pet: 'Pet',
    Other: 'Other',
});

const Activity = t.struct({
    category: Category,
    title: t.String,
    description: t.maybe(t.String),
});


export default class Initiate extends React.Component {

    handleClick = () => {
        const value = this._form.getValue();
        if (value) {
            this.props.navigation.navigate(("InitiateStep2"), {actInfo: value});
        }
    };

    render() {
        return (
            <ImageBackground
                source={require('../../assets/image/colorful.jpg')}
                style={{width: '100%', height: '100%'}}
            >
                <View style={styles.container}>
                    <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1,justifyContent : 'center'}}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                Step 1: Describe Your Activity
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
                                onPress={this.handleClick}
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
        elevation: 2,
        shadowOpacity: 1,
        backgroundColor: '#1DA1F2',
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
                    },100);
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