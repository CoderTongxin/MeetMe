// import React from 'react';
// import {StyleSheet, View, ImageBackground, Dimensions, StatusBar, AsyncStorage} from 'react-native';
// import {HomeScreenRoot, Root} from '../config/Route';
//
//
// const BG_IMAGE = require('../assert/image/sun.jpg');
// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;
//
// export default class Welcome extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: null,
//         }
//     };
//
//     checkLoginStatus() {
//         AsyncStorage.getItem('user')
//             .then((value) => {
//                 this.setState({user: value})
//             })
//             .done();
//
//         if (this.state.user !== null) {
//             console.log('1');
//             console.log(this.state.user);
//             // this.props.navigation.navigate(("HomeScreenRoot"))
//         }
//
//         if (this.state.user == null){
//             console.log('2');
//             console.log(this.state.user);
//             // this.props.navigation.navigate(("Login"))
//         }
//
//     };
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <ImageBackground
//                     source={BG_IMAGE}
//                     style={styles.bgImage}
//                 >
//
//                 </ImageBackground>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     bgImage: {
//         flex: 1,
//         top: 0,
//         left: 0,
//         width: SCREEN_WIDTH,
//         height: SCREEN_HEIGHT,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
// });
