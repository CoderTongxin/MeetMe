import React from 'react';
import ActivityDetail from '../app/components/ActivityDetail';
import MapView from 'react-native-maps'

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const act = {
        "category": "Food",
        "description": "Uni sushi",
        "id": "-LBi9dAZCLsnHhlZESZw",
        "image": {
            "uri": "https://www.rd.com/wp-content/uploads/2017/10/02_Fruit_Healthy-Holiday-Food-Gifts-Instead-of-Fruit-Cake_632353679-Avdeyukphoto-760x506.jpg"
        },
        "location": {
            "latitude": -36.85414232932999,
            "longitude": 174.76950171821272
        },
        "owner": {
            "uid": "gYKjStPnEVNASL9cIvHMmHNFLtw2",
            "username": "Test1"
        },
        "participants": {
            "7eFaCSnlxHWXelpQ6wpLNBC2m072": {
                "uid": "7eFaCSnlxHWXelpQ6wpLNBC2m072",
                "username": "GinX"
            },
            "EWEfCtiOWhbXQWHNAiif7Tv2Y753": {
                "uid": "EWEfCtiOWhbXQWHNAiif7Tv2Y753",
                "username": "Gingin"
            },
            "K124GEolovVF9nveSt22vKaE6nI3": {
                "uid": "K124GEolovVF9nveSt22vKaE6nI3",
                "username": "Tester"
            },
            "gYKjStPnEVNASL9cIvHMmHNFLtw2": {
                "uid": "gYKjStPnEVNASL9cIvHMmHNFLtw2",
                "username": "Test1"
            },
            "hhhs3jacTzNTdpNohoAL1t1haDl2": {
                "uid": "hhhs3jacTzNTdpNohoAL1t1haDl2",
                "username": "Test3"
            }
        },
        "status": "open",
        "time": {
            "date": "Thursday, June 7, 2018",
            "time": "2:38 PM"
        },
        "title": "Sushi"
    };

    const tree = renderer.create(<ActivityDetail act={act} names={"GeinX, Gingin, Tester, Test1, Test3"} num={5}/>).toJSON();
    expect(tree).toMatchSnapshot();
});