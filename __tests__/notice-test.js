
import React from 'react';
import Notice from '../app/components/Notice';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Notice />).toJSON();
    expect(tree).toMatchSnapshot();
});