import React from 'react';
import { shallow } from 'enzyme';

import { FrontPage } from '../';

describe('<FrontPage />', () => {
  it('renders correctly', () => {
    const props = {
      posts: [],
      loading: false,
      error: false,
      pageNumber: 1,
      loadPosts: jest.fn(),
      hasLoaded: false,
    };

    const tree = shallow(<FrontPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly while loading', () => {
    const props = {
      posts: false,
      loading: true,
      error: false,
      pageNumber: 1,
      loadPosts: jest.fn(),
      hasLoaded: false,
    };

    const tree = shallow(<FrontPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly on error', () => {
    const props = {
      posts: false,
      loading: false,
      error: true,
      pageNumber: 1,
      loadPosts: jest.fn(),
      hasLoaded: false,
    };

    const tree = shallow(<FrontPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
