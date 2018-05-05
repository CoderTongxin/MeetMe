import React from 'react';
import {getParticipantsUsername} from '../app/screens/Activities';

test('renders correctly', () => {
    this.state = {
        participantsNames: '',
        participantsNum: 0,
    };

    const participants = {
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
    };

    getParticipantsUsername(participants);

    expect(this.state.participantsNames).toBe("GeinX, Gingin, Tester, Test1, Test3");
});