import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import { Text, Divider } from 'react-native-elements';
import MapView from "react-native-maps";


export default class ActivitiesDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    // getParticipantsUsername(participants) {
    //     let count = 0;
    //     let names = '';
    //     for (const key in participants) {
    //         if (participants.uid===this.state.user.id){
    //             this.setState({isJoined:true})
    //         }
    //
    //         if (count === 0) {
    //             names += participants[key].username;
    //         } else {
    //             names += ', ' + participants[key].username;
    //         }
    //         count++
    //     }
    //     return names;
    // }

    render() {
        return (
            <View style={{flex: 6}}>

                <View style={styles.actInfo}>
                    <View style={styles.actInfoLine}>
                        <Text style={styles.actInfoTitle}>
                            {this.props.act.title}
                        </Text>
                    </View>
                    <Divider/>
                    <View style={styles.actInfoLine}>
                        <Text style={styles.actInfoDetail}>
                            Category: {this.props.act.category}
                        </Text>
                    </View>
                    <View style={styles.actInfoLine}>
                        <Text style={styles.actInfoDetail}>
                            Date: {this.props.act.time.date}
                        </Text>
                    </View>
                    <View style={styles.actInfoLine}>
                        <Text style={styles.actInfoDetail}>
                            Time: {this.props.act.time.time}
                        </Text>
                    </View>
                    <View style={styles.actInfoLine}>
                        <Text style={styles.actInfoDetail}>
                            Creator: {this.props.act.owner.username}
                        </Text>
                    </View>
                    <View style={styles.actInfoLine}>
                        <Text style={styles.actInfoDetail}>
                            Participants:this.props.names
                        </Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={styles.actInfoDetail}>
                            Description: {this.props.act.description}
                        </Text>
                    </View>
                </View>

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
        margin: 10,
        marginBottom: 0,
        justifyContent: 'space-around',
    },
    mapContainer: {
        flex: 3,
        margin: 10,
        marginTop: 0,
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

    actInfoLine: {
        flex: 1
    },

    actInfoTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign:'center',
        // fontFamily: 'Lato',
    },

    actInfoDetail: {
        fontSize: 18,
        color: "#444",
        textAlign: "justify",
        // fontFamily: 'Lato',
    },

});