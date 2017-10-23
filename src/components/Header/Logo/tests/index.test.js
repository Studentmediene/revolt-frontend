import React from 'react';
import { shallow } from 'enzyme';

import Logo from '../';

describe('<Logo />', () => {
  it('renders correctly', () => {
    const tree = shallow(<Logo />);
    expect(tree).toMatchSnapshot();
  });
});
