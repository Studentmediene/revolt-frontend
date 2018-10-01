import React from 'react';
import { shallow } from 'enzyme';

import { About } from '../';

describe('<About />', () => {
  it('renders correctly', () => {
    const props = {
      about: '<p>about</p>',
      loading: false,
      error: false,
      loadAbout: jest.fn(),
    };

    const tree = shallow(<About {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly while loading', () => {
    const props = {
      about: '<p>about</p>',
      loading: true,
      error: false,
      loadAbout: jest.fn(),
    };

    const tree = shallow(<About {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly on error', () => {
    const props = {
      about: '<p>about</p>',
      loading: false,
      error: true,
      loadAbout: jest.fn(),
    };

    const tree = shallow(<About {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
