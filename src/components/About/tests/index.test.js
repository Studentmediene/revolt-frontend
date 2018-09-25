import React from 'react';
import { shallow } from 'enzyme';

import About from '../';

describe('<About />', () => {
  it('renders correctly', () => {
    const tree = shallow(<About />);
    expect(tree).toMatchSnapshot();
  });
});
