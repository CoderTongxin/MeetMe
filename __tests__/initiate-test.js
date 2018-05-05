
import React from 'react';
import Initiate from '../app/screens/Initiate';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Initiate />).toJSON();
    expect(tree).toMatchSnapshot();
});