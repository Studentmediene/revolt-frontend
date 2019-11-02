import React from 'react';
import { shallow } from 'enzyme';

import { NavDrawer} from '../';
import { JestEnvironment } from '@jest/environment';

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
      ],
      open: true,
      onNavigation: jest.fn(),
    }
    const tree = shallow(<NavDrawer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
