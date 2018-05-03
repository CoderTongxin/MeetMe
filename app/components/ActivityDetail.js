import React from 'react';
import {StyleSheet, View, Text,Image,TouchableOpacity} from 'react-native';
import {Icon, Divider, Button} from 'react-native-elements';
import MapView from "react-native-maps";


export default class ActivitiesDetail extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.actInfo}>
                    <Text>
                        {this.state.act.title}
                    </Text>
                    <Divider/>
                    <Text>
                        Activity Category: {this.state.act.category}
                    </Text>
                    <Text>
                        Activity Date: {this.state.act.time.date}
                    </Text>
                    <Text>
                        Activity Time: {this.state.act.time.time}
                    </Text>
                    <Text>
                        Activity Creator: {this.state.act.owner.username}
                    </Text>
                    <Text>
                        Activity Participants: Jack Tester, Tom Tester, James Tester
                    </Text>
                    <Text>
                        Activity Description: {this.state.act.description}
                    </Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.act.location.latitude,
                            longitude: this.state.act.location.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.001,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.act.location.latitude,
                                longitude: this.state.act.location.longitude,
                                latitudeDelta: 0.003,
                                longitudeDelta: 0.001,
                            }}
                            key={this.state.act.actNum}
                            actId={this.state.act.key}
                        />
                    </MapView>

                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
});