import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../';

describe('<NotFound />', () => {
  it('renders correctly', () => {
    const tree = shallow(<NotFound />);
    expect(tree).toMatchSnapshot();
  });
});
