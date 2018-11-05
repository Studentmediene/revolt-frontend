import React from 'react';
import { shallow } from 'enzyme';

import Sidebar from '../';

describe('<Sidebar />', () => {
  it('renders correctly', () => {
    const tree = shallow(<Sidebar />);
    expect(tree).toMatchSnapshot();
  });
});
