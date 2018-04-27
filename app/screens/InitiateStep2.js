import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,

} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import MapView from "react-native-maps/lib/components/MapView";




export default class InitiateStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            usersPlaces: [],
            pinLocation: null,
            userLocation: null,
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    userLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }
                });
            },
            err => console.log(err)
        );
    }

    render() {

        let userLocationMarker = null;

        if (this.state.userLocation) {
            userLocationMarker = <
                MapView.Marker
                draggable
                coordinate={this.state.userLocation}
                onDragEnd={(e) => this.setState({userLocation: e.nativeEvent.coordinate})}
            />
        }

        const {params} = this.props.navigation.state;
        const actInfo = params ? params.actInfo : null;
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: -36.84705474575118,
                        longitude: 174.76480531990111,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.01,
                    }}
                >
                    {userLocationMarker}
                    <Button
                        onPress={() =>  this.props.navigation.navigate(("InitiateStep3"))}
                        title="Initiate the Activity!"
                        color="#841584"
                    />
                </MapView>

            </View>
        );
    }
}

InitiateStep2.navigationOptions = ({navigation}) => ({
    title: 'Initiate',
    headerTitleStyle: {textAlign: "center", flex: 1},
    headerLeft:
        <View style={{paddingLeft: 10}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#808080"/>
            </TouchableOpacity>
        </View>,
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
        backgroundColor: '#ffffff',
    },
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    }

});