import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import t from 'tcomb-form-native';

const dateFormat = require('dateformat');

const Form = t.form.Form;

const options = {

    fields: {
        category: {
            placeholder: 'Please tell others what kind of activity you are initiating',
            error: 'Category cannot be blank',
        },
        title: {
            placeholder: 'A beautiful title can attract people to join your activity',
            error: 'Title cannot be blank',
        },
        description: {
            placeholder: 'A brief description can offer more opportunities to encounter new friends'
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
    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
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
                </View>
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