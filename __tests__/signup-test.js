
import React from 'react';
import Signup from '../app/screens/Signup';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Signup />).toJSON();
    expect(tree).toMatchSnapshot();
});