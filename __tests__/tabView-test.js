
import React from 'react';
import TabView from '../app/components/TabView';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<TabView />).toJSON();
    expect(tree).toMatchSnapshot();
});