// import React from 'react';
// import {StyleSheet, View} from 'react-native';
//
// import {MapView} from 'expo';
//
// // common Marker = MapView.Marker;
// // common Callout = MapView.Callout;
// // common Polygon = MapView.Polygon;
// // common Polyline = MapView.Polyline;
// // common Circle = MapView.Circle;
// // common Overlay = MapView.Overlay;
//
//
// const Map = props => {
//     let userLocationMarker = null;
//     if (props.userLocation) {
//         userLocationMarker = <
//             MapView.Marker
//             draggable
//             coordinate={props.userLocation}
//             onDragEnd={(e) => {
//                 props.userLocation = e.nativeEvent.coordinate
//             }}
//         />
//     }
//
//     const usersMarks = props.actPlaces.map(actPlaces => (
//         <MapView.Marker coordinate={actPlaces} key={actPlaces.id} title={actPlaces.title}
//                         description={actPlaces.description}/>
//     ));
//
//
//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 initialRegion={{
//                     latitude: -36.84705474575118,
//                     longitude: 174.76480531990111,
//                     latitudeDelta: 0.03,
//                     longitudeDelta: 0.01,
//                 }}
//                 region={props.userLocation}
//             >
//                 {userLocationMarker}
//                 {usersMarks}
//             </MapView>
//         </View>
//     );
// };
//
//
// const styles = StyleSheet.create({
//     Container: {
//         flex: 1
//     },
//     map: {
//         width: '100%',
//         height: '100%',
//     },
//
//
// });
//
// export default Map;
