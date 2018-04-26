import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Header from 'react-navigation/src/views/Header/Header';
import {Icon} from 'react-native-elements';
import Map from '../components/Map.js';
import FetchLocation from '../components/FetchLocation';

export default class MapModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersPlaces: [],
            pinLocation: null,
        }
    };

    // getUserLocationHandler = () => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //             this.setState({
    //                 userLocation: {
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude,
    //                     latitudeDelta: 0.0922,
    //                     longitudeDelta: 0.0421,
    //                 }
    //             });
    //         },
    //         err => console.log(err)
    //     );
    // };

    render() {
        const { params } = this.props.navigation.state;
        const userLocation = params ? params.userLocation : null;
        return (
            <View style={{flex: 1}}>
                {/*The key part to rewrite Header and make a icon to close the modal screen*/}
                <Header
                    scene={{index: 0}}
                    scenes={[{index: 0, isActive: true}]}
                    navigation={{state: {index: 0}}}
                    getScreenDetails={() => ({
                        options: {
                            headerTitleStyle: {textAlign: "center", flex: 1},
                            title: 'Map View',
                            headerLeft: (<View></View>),
                            headerRight: (
                                <View style={{paddingRight: 10}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                        <Icon name="close" size={25} color="#808080"/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })}
                />

                {/*Edit here to add any functions*/}
                <View>

                    {/*<FetchLocation onGetLocation={this.getUserLocationHandler}/>*/}

                    {/*<View>*/}
                    {/*<Button title={"Get User Places"} onPress={this.getUsersPlacesHandler()}/>*/}
                    {/*</View>*/}

                    {/*{this.getUserLocationHandler()}*/}

                    <Map
                        userLocation={userLocation}
                        usersPlaces={this.state.usersPlaces}
                        pinLocation={this.state.pinLocation}
                    />
                </View>
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

    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    }

});