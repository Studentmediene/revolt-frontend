import React from 'react';
import { shallow } from 'enzyme';

import { LeftHeader } from '../';

describe('<LeftHeader />', () => {
  it('renders correctly', () => {
    const tree = shallow(<LeftHeader />);
    expect(tree).toMatchSnapshot();
  });
});
