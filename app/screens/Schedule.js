import React from 'react';
import {StyleSheet, ScrollView,View, TouchableOpacity} from 'react-native';
import {
    Text,
    Card,
    ButtonGroup,
    Tile,
    Icon,
    ListItem,
    Avatar} from 'react-native-elements';


const activityList = [
    {
        category:'eating',
        title: 'Korean food  on queens street',
        category_photo:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        date: '01-03-2018',
    },
    {
        category:'eating',
        title: 'Korean food  on queens street',
        category_photo:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        date: '01-03-2018',
    },
    {
        category:'eating',
        title: 'Korean food  on queens street',
        category_photo:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        date: '01-03-2018',
    },
    {
        category:'eating',
        title: 'Korean food  on queens street',
        category_photo:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        date: '01-03-2018',
    },
    {
        category:'eating',
        title: 'Korean food  on queens street',
        category_photo:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        date: '01-03-2018',
    },
];

export default class Schedule extends React.Component {

    log() {
        console.log('hello')
    }
    render() {
        return (
                <ScrollView>

                    <View style={styles.list}>
                        {activityList.map((l, i) => (
                            <ListItem
                                leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
                                key={i}
                                onPress={this.log}
                                title={l.title}
                                subtitle={l.date}
                                chevron
                                bottomDivider
                                topDivider
                            />
                        ))}
                    </View>
                </ScrollView>
        );
    }
}

Schedule.navigationOptions = ({navigation}) => ({
    title: 'Schedule',
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerLeft: (<View></View>),
    headerRight:
        <View style={{paddingRight: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="account-circle" size={25} color="#808080" />
            </TouchableOpacity>
        </View>,
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    list: {
        marginTop: 20,
        backgroundColor: '#fff',
    }
})