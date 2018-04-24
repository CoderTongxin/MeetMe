import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MapView} from 'expo';

const usersMap = props => {
    let userLocationMarker = null;
    if (props.userLocation) {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>
    }

    // const usersMarks = props.usersPlaces.map(usersPlace => (
    //     <MapView.Marker coordinate={usersPlace} key={usersPlace.id}/>
    // ));

    return (
        <View style={styles.mapContainer}>
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
                {/*{userLocationMarker}*/}
                {/*{usersMarks}*/}
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
