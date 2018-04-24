import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import Map from '../components/Map'

export default class MapView extends React.Component {
    constructor(props) {
        super(props);
    };

    static navigationOptions = (navigation) => ({
        headerTitleStyle: {textAlign: "center", flex: 1},
        title: 'Map View',
        headerLeft: (<View></View>),
        headerRight:
            <Button
                title="Close"
                onPress={() => navigation.goBack}
            />,
    });

    render() {
        return (
            <View style={styles.container}>
                <Map/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});