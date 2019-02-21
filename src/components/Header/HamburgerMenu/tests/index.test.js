import React from 'react';
import { shallow } from 'enzyme';

import { HamburgerMenu } from '../';

describe('<HamburgerMenu />', () => {
  it('renders correctly', () => {
    const mockProps = {
      togglePlayPause: jest.fn(),
      paused: true,
    };
    const tree = shallow(<HamburgerMenu {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
});
