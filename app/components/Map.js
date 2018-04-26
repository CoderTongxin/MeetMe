import React from 'react';
import {StyleSheet, View} from 'react-native';
// import {MapView} from 'expo';
import MapView, { Marker }from 'react-native-maps';

// common Marker = MapView.Marker;
// common Callout = MapView.Callout;
// common Polygon = MapView.Polygon;
// common Polyline = MapView.Polyline;
// common Circle = MapView.Circle;
// common Overlay = MapView.Overlay;



const usersMap = props => {
    let userLocationMarker = null;
    if (props.userLocation) {
        userLocationMarker = <
            MapView.Marker
            coordinate={props.userLocation}
            title={'Best Sushi!'}
            description={'I found a amazing sushi, join me!'}
        />
    }

    const usersMarks = props.usersPlaces.map(usersPlace => (
        <MapView.Marker coordinate={usersPlace} key={usersPlace.id}/>
    ));


    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -36.84705474575118,
                    longitude: 174.76480531990111,
                    latitudeDelta: 0.07,
                    longitudeDelta: 0.03,
                }}
                region={props.userLocation}
            >
                {userLocationMarker}
                {usersMarks}
            </MapView>
        </View>
    );
};


const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    }


});

export default usersMap;
