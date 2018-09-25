import React from 'react';
import { shallow } from 'enzyme';

import Loader from '../';

describe('<Loader />', () => {
  it('renders correctly', () => {
    const tree = shallow(<Loader />);
    expect(tree).toMatchSnapshot();
  });
});
