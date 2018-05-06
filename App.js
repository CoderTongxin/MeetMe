import React from 'react';
import {StyleSheet, View,Image} from 'react-native';
import {AppLoading, Asset, Font} from 'expo'
import {Root} from './app/config/Route';


console.disableYellowBox = true;
function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default class App extends React.Component {
    state = {
        isReady: false,
    };

    async _loadResourcesAsync ()  {
        const imageAssets = cacheImages([
            'https://cdn.dribbble.com/users/285475/screenshots/4550443/presto_walk.gif',
            'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
            "https://static1.squarespace.com/static/51277219e4b08376dc025505/t/55f17df3e4b0d3922cc4c416/1441889779581/?format=300w",
            "http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03170233/cute-cat.jpg",
            "https://images.unsplash.com/10/wii.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=592b3b24ffafc20dbe8b0a1df97ef5c6&w=1000&q=80",
            "http://www.nebrija.com/medios/actualidadnebrija/wp-content/uploads/sites/2/2016/11/bbva-educacion-1920x0-c-f-787x459.jpg",
            "https://st.depositphotos.com/2185383/4533/v/950/depositphotos_45330093-stock-illustration-cinema-concept.jpg",
            "http://www.youthvillage.co.za/wp-content/uploads/2014/10/football-fiesta-salisbury.jpg",
            "https://optinmonster.com/wp-content/uploads/2016/03/Reduce-Shopping-Cart-Abandonment.png",
            "https://www.rd.com/wp-content/uploads/2017/10/02_Fruit_Healthy-Holiday-Food-Gifts-Instead-of-Fruit-Cake_632353679-Avdeyukphoto-760x506.jpg",
            require('./assets/image/initiateRedo.gif'),
            require('./assets/image/colorful.jpg'),
            require('./assets/image/square.png'),
            require('./assets/image/walk_small.gif'),
            require('./assets/image/finished.gif'),
        ]);

       await Promise.all([
            ...imageAssets, Font.loadAsync({
               'regular':require('./assets/fonts/Montserrat-Regular.ttf'),
               'light':require('./assets/fonts/Montserrat-Light.ttf'),
               'bold': require('./assets/fonts/Montserrat-Bold.ttf')
           }),
        ]);
    };

    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
    render() {
        if (!this.state.isLoadingComplete) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <Root/>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
