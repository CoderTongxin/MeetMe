import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import t from 'tcomb-form-native';

const dateFormat = require('dateformat');

const Form = t.form.Form;

const options = {

    fields: {
        category: {
            nullOption: {value: '', text: 'Please select activity type'},
            error: 'Please tell others what kind of activity you are initiating',
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
                format: ((date) => dateFormat(date, "fullDate")),
            },
        },
        time: {
            mode: 'time',
            error: 'Invalid time',
            config: {
                format: ((date) => dateFormat(date, "mediumTime")),
            },
        }
    },
};

const Category = t.enums({
    Food: 'Food',
    Sports: 'Sports',
    Shopping: 'Shopping',
    Movie: 'Movie',
    Study: 'Study',
    Game: 'Game',
    Pet: 'Pet',
});

const Activity = t.struct({
    category: Category,
    title: t.String,
    description: t.maybe(t.String),
    date: t.Date,
    time: t.Date,
});

export default class Initiate extends React.Component {
    constructor(props) {
        super(props);
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

    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    render() {
        return (
            <ScrollView style={styles.container}>

                    <Form
                        ref={c => this._form = c}
                        type={Activity}
                        options={options}
                    />

                    <Button
                        title="Submit"
                        onPress={this.handleSubmit}
                    />

                    {/*<Button*/}
                    {/*onPress={() => this.props.navigation.navigate(("MapView"))}*/}
                    {/*title="Open Map"*/}
                    {/*color="#841584"*/}
                    {/*/>*/}


            </ScrollView>

        );
    }
}

Initiate.navigationOptions = ({navigation}) => ({
    title: 'Initiate',
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
        padding: 20,
        backgroundColor: '#ffffff',
    },
});