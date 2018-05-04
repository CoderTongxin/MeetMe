import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import {Button,Icon} from 'react-native-elements'
import t from 'tcomb-form-native';

const _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.pickerTouchable.normal.height = 36;
stylesheet.pickerTouchable.error.height = 36;

const dateFormat = require('dateformat');

const Form = t.form.Form;

const options = {
    order: ['title', 'description', 'category', 'date', 'time'],
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
            placeholder: 'Please write a brief activity description'
        },
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
    date: t.Date,
    time: t.Date,
});


export default class Initiate extends React.Component {

    handleSubmit = () => {
        const value = this._form.getValue();
        if (value) {
            this.props.navigation.navigate(("InitiateStep2"), {actInfo: value});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.formContainer}>

                        <Form
                            ref={c => this._form = c}
                            type={Activity}
                            options={options}
                        />
                        <Button
                            style={styles.button}
                            large
                            title="Next"
                            onPress={this.handleSubmit}
                        />

                    </View>
                </ScrollView>
            </View>
        );
    }
}
let load=true;

Initiate.navigationOptions = ({navigation}) => ({
    title: 'Initiate',
    headerStyle: {
        elevation: 2,
        shadowOpacity: 1,
        backgroundColor: '#1DA1F2',
    },
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerTintColor: '#fff',
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity onPress={() => {
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
    container:{
        flex: 1,
        backgroundColor:'#A6A6A6',
    },
    formContainer: {
        flex: 1,
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