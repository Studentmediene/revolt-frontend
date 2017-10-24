import React from 'react';
import { shallow } from 'enzyme';

import NavBar from '../';

describe('<NavBar />', () => {
  it('renders correctly', () => {
    const tree = shallow(<NavBar />);
    expect(tree).toMatchSnapshot();
  });
});
