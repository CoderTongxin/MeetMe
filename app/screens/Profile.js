import React from 'react';
import {StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Header from 'react-navigation/src/views/Header/Header';
import {Icon, Avatar} from 'react-native-elements';
import {firebaseRef} from "../servers/Firebase";



export default class Profile extends React.Component {
constructor(props){
    super(props);
}


    logout(){
        firebaseRef.auth().signOut().then(function() {
            this.props.navigation.navigate('Login');
        }.bind(this), function(error) {
            Alert.alert(error.message)
        });
    }

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
                            headerTitleStyle: {textAlign: "center", flex: 1},
                            title: 'Profile',
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
                <View style={{flex: 1, backgroundColor: 'rgba(241,240,241,1)'}}>
                    <ScrollView style={{flex: 1, marginBottom: 20}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            alignItems: 'center',
                            marginHorizontal: 10,
                            height: 250,
                            marginBottom: 10
                        }}>
                            <View style={{flex: 3, flexDirection: 'row'}}>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Avatar
                                        width={145}
                                        height={145}
                                        source={{
                                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiLjH5U5QUf8tpKJy0NNS30s38KygCCVRjnPDGYvtLVGRla_DvTw',
                                        }}
                                        activeOpacity={0.7}
                                        avatarStyle={{borderRadius: 145 / 2}}
                                        overlayContainerStyle={{backgroundColor: 'transparent'}}
                                    />
                                </View>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={{flex: 1, marginTop: 10, justifyContent: 'center'}}>
                                        <Text style={{
                                            fontFamily: 'bold',
                                            fontSize: 25,
                                            color: 'rgba(98,93,144,1)',
                                            marginLeft: -15
                                        }}>
                                            TONGXIN XIE
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                width: 300,
                                borderWidth: 0.5,
                                borderColor: 'rgba(222, 223, 226, 1)',
                                marginHorizontal: 20,
                                height: 1,
                                marginVertical: 10
                            }}/>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Button title='logout' color="#841584" onPress={()=>this.logout()}/>
                            </View>
                        </View>
                    </ScrollView>
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