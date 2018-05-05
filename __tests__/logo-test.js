
import React from 'react';
import Logo from '../app/components/Logo';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
});