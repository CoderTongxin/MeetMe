import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Header from 'react-navigation/src/views/Header/Header';
import {Icon} from 'react-native-elements';

export default class Settings extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>

                {/*The key part to rewrite Header and make a icon to close the modal screen*/}
                <Header
                    scene={{index: 0}}
                    scenes={[{index: 0, isActive: true}]}
                    navigation={{state: {index: 0}}}
                    getScreenDetails={() => ({
                        options: {
                            headerStyle: {
                                elevation: 3,
                                backgroundColor: '#1DA1F2',
                                shadowColor: "#000",
                                shadowRadius: 2,
                                shadowOpacity: 0.3,
                                shadowOffset: {x: 2, y: -2},
                            },
                            headerTitleStyle: {textAlign: "center", flex: 1},
                            headerTintColor: '#fff',
                            title: 'Settings',
                            headerLeft: (<View></View>),
                            headerRight: (
                                <View style={{paddingRight: 10}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                        <Icon name="close" size={25} color="white"/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })}
                />

                {/*Edit here to add any functions*/}
                <View style={styles.container}>
                    <Text>
                        Welcome to Settings screen!
                    </Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});