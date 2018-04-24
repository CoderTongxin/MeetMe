import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableHighlight,
    ListView,
} from 'react-native';
import {
    Text,
    Card,
    ButtonGroup,
    Tile,
    Icon,
    ListItem,
    Avatar,
} from 'react-native-elements';

const activityList = [
    {
        name: 'Amy Farha',
        avatar_url:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
    },
    {
        name: 'Chris Jackson',
        avatar_url:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
    },
    {
        name: 'Amanda Martin',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: 'CEO',
    },
    {
        name: 'Christy Thomas',
        avatar_url:
            'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg',
        subtitle: 'Lead Developer',
    },
    {
        name: 'Melissa Jones',
        avatar_url:
            'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg',
        subtitle: 'CTO',
    },
];

export default class Home extends Component {

  constructor(props){
      super(props)
  }
 log() {
      console.log('hello')
 }

    render () {
        return (
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Activity Lists</Text>
                </View>
                <View style={styles.list}>
                    {activityList.map((l, i) => (
                        <ListItem
                            leftAvatar={{ rounded: true, source: { uri: l.avatar_url } }}
                            key={i}
                            onPress={this.log}
                            title={l.name}
                            subtitle={l.subtitle}
                            chevron
                            bottomDivider
                            topDivider
                        />
                    ))}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    list: {
        marginTop: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff'
    },
    heading: {
        fontSize:20
    }
})