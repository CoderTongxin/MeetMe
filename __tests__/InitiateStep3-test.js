
import React from 'react';
import InitiateStep3 from '../app/screens/InitiateStep3';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<InitiateStep3 />).toJSON();
    expect(tree).toMatchSnapshot();
});