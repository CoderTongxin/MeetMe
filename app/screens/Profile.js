import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import Header from 'react-navigation/src/views/Header/Header';
import {Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebaseRef} from "../servers/Firebase";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('user', (err, result) => {
            this.setState({
                user: JSON.parse(result)
            });
        });
    }

    logout() {
        firebaseRef.auth().signOut().then(function () {
            AsyncStorage.removeItem('user', () => {
                this.props.navigation.navigate('Login');
            })
        }.bind(this)).catch((error) => {
            Alert.alert(error.message)
        });
    }

    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
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
                    <View style={styles.contentContainer}>
                        <View style={{flex: 3, flexDirection: 'column', marginBottom: 30}}>
                            <View style={{marginTop: 5}}>
                                <Avatar
                                    xlarge
                                    rounded
                                    source={{
                                        uri: this.state.user.avatar,
                                    }}
                                    activeOpacity={0.7}
                                    overlayContainerStyle={{backgroundColor: 'transparent'}}
                                />
                            </View>
                            <View>
                                <Text style={{
                                    fontFamily: 'bold',
                                    fontSize: 25,
                                    color: 'rgba(98,93,144,1)',
                                }}>
                                    {this.state.user.username}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            width: 300,
                            borderWidth: 0.5,
                            borderColor: 'rgba(222, 223, 226, 1)',
                            marginHorizontal: 20,
                            height: 1,
                        }}/>
                        <View style={{flex: 1, alignItems: 'center',marginTop:10}}>
                            <Button
                                title='Logout'
                                icon={
                                    <Icon
                                        name='sign-out'
                                        size={15}
                                        color='white'
                                    />}
                                buttonStyle={{
                                    backgroundColor: "rgba(92, 99,216, 1)",
                                }}
                                onPress={this.logout}/>
                        </View>
                    </View>

            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(241,240,241,1)'
    },
    contentContainer:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
        height: 250,
        marginVertical: 10
    }
});