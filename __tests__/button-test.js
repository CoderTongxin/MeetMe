
import React from 'react';
import SubmitButton from '../app/components/SubmitButton';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<SubmitButton />).toJSON();
    expect(tree).toMatchSnapshot();
});