import React from 'react';
import {StyleSheet, View, ScrollView, Text, Dimensions} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import MapView from "react-native-maps";

const dateFormat = require('dateformat');
const {width, height} = Dimensions.get("window");
const MODAL_HEIGH = height * 0.8;
const MODAL_WIDTH = width * 0.8;

export default class ActivitiesDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 4, margin: 10}}>
                <View style={{flex:3}}>
                    <ScrollView>
                        <View style={styles.actInfoLine}>
                            <Text style={styles.actInfoTitle}>
                                {this.props.act.title}
                            </Text>
                            <Divider/>
                            <View style={[styles.inlineInfo]}>
                                <View style={styles.inlineComponent}>
                                    <Icon name='grade' color='#808080' size={16} style={styles.inlineIcon}/>
                                    <Text style={styles.inlineText}>
                                        {this.props.act.category}
                                    </Text>
                                </View>

                            </View>
                            <View style={styles.inlineInfo}>
                                <View style={styles.inlineComponent}>
                                    <Icon name='date-range' color='#808080' size={16} style={styles.inlineIcon}/>
                                    <Text style={styles.inlineText}>
                                        {dateFormat(this.props.act.time.date, "shortDate")}
                                    </Text>
                                </View>
                                <View style={styles.inlineComponent}>
                                    <Icon name='access-time' color='#808080' size={16} style={styles.inlineIcon}/>
                                    <Text style={styles.inlineText}>
                                        {this.props.act.time.time}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.inlineInfo}>
                                <View style={styles.inlineComponent}>
                                    <Icon name='person' color='#808080' size={16} style={styles.inlineIcon}/>
                                    <Text style={styles.inlineText}>
                                        {this.props.act.owner.username}
                                    </Text>
                                </View>
                                <View style={styles.inlineComponent}>
                                    <Icon name='people' color='#808080' size={16} style={styles.inlineIcon}/>
                                    <Text style={styles.inlineText}>
                                        {this.props.num}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.actInfoLine}>
                            <Text style={styles.actInfoTitle}>
                                Participants
                            </Text>
                            <Divider/>
                            <Text style={styles.inlineInfo}>
                                {this.props.names}
                            </Text>
                        </View>
                        <View style={styles.actInfoLine}>
                            <Text style={styles.actInfoTitle}>
                                Description
                            </Text>
                            <Divider/>
                            <Text style={styles.inlineInfo}>
                                {this.props.act.description}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.mapLine}>
                    <Text style={styles.actInfoTitle}>
                        Location
                    </Text>
                    <Divider/>
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

            </View>


        );
    }
}


const styles = StyleSheet.create({

    mapContainer: {
        marginVertical: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {x: 2, y: -2},
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },

    inlineIcon: {},


    inlineText: {
        fontSize: 16,
        color: "#808080",
    },

    inlineInfo: {
        flexDirection: 'row',
        marginTop: 5
    },

    mapLine: {
        flex: 2,
        marginBottom: 10,
    },
    inlineComponent: {
        flexDirection: 'row',
        marginRight: 10,
    },

    actInfoLine: {
        marginBottom: 10,
    },
    actInfoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#2E3347',
    },

    actInfoDetail: {
        fontSize: 16,
        color: "#444",
        textAlign: "justify",
        // fontFamily: 'Lato',
    },

});