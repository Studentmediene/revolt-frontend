import React from 'react';
import { shallow } from 'enzyme';

import { RightHeader } from '../';

describe('<RightHeader />', () => {
  it('renders correctly', () => {
    const tree = shallow(<RightHeader />);
    expect(tree).toMatchSnapshot();
  });
});
