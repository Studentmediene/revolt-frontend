import React from 'react';
import { shallow } from 'enzyme';

import NavList from '../';

describe('<NavList />', () => {
  it('renders correctly', () => {
    const props = {
      links: [
        {
          path: '/link1',
          title: 'Link1',
        },{
          path: '/link2',
          title: 'Link2',
        }
      ]
    }
    const tree = shallow(<NavList {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
