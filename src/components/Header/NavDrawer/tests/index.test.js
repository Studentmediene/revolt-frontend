import React from 'react';
import { shallow } from 'enzyme';

import NavDrawer from '../';

describe('<NavDrawer />', () => {
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
    const tree = shallow(<NavDrawer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
