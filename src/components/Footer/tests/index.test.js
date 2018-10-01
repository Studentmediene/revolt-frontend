import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../';

describe('<Footer />', () => {
  it('renders correctly', () => {
    const tree = shallow(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});