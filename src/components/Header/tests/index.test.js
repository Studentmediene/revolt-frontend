import React from 'react';
import { shallow } from 'enzyme';

import Header from '../';

describe('<Header />', () => {
  it('renders correctly', () => {
    const tree = shallow(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
