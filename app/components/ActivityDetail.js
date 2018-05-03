import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import MapView from "react-native-maps";


export default class ActivitiesDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 6}}>
                <ScrollView>
                    <View style={styles.actInfo}>
                        <Text>
                            {this.props.act.title}
                        </Text>
                        <Divider/>
                        <Text>
                            Activity Category: {this.props.act.category}
                        </Text>
                        <Text>
                            Activity Date: {this.props.act.time.date}
                        </Text>
                        <Text>
                            Activity Time: {this.props.act.time.time}
                        </Text>
                        <Text>
                            Activity Creator: {this.props.act.owner.username}
                        </Text>
                        <Text>
                            Activity Participants: Jack Tester, Tom Tester, James Tester
                        </Text>
                        <Text>
                            Activity Description: {this.props.act.description}
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: this.props.act.location.latitude,
                            longitude: this.props.act.location.longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.001,
                        }}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.props.act.location.latitude,
                                longitude: this.props.act.location.longitude,
                                latitudeDelta: 0.003,
                                longitudeDelta: 0.001,
                            }}
                            key={this.props.act.actNum}
                            actId={this.props.act.key}
                        />
                    </MapView>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    actInfo: {
        flex: 3,
        margin:10,
        marginBottom:0
    },
    mapContainer: {
        flex: 4,
        margin:10,
        marginTop:0,
        elevation: 2,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
    },
    map: {
        width: '100%',
        height: '100%',
    },

});