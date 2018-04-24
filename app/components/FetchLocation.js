import React from 'react';

import {Button} from 'react-native-elements'

const fetchLocation = (props) => {
    return (
        <Button
            title="Get Location"
            onPress={props.onGetLocation}
        />
    );

};

export default fetchLocation;