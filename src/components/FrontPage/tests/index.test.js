import React from 'react';
import { shallow } from 'enzyme';

import { FrontPage } from '../';

describe('<FrontPage />', () => {
  it('renders correctly', () => {
    const props = {
      posts: [],
      highlightedPosts: [],
      loading: false,
      error: false,
      postOffset: 0,
      loadPosts: jest.fn(),
      hasLoaded: false,
    };

    const tree = shallow(<FrontPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly while loading', () => {
    const props = {
      posts: false,
      highlightedPosts: false,
      loading: true,
      error: false,
      postOffset: 0,
      loadPosts: jest.fn(),
      hasLoaded: false,
    };

    const tree = shallow(<FrontPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly on error', () => {
    const props = {
      posts: false,
      highlightedPosts: false,
      loading: false,
      error: true,
      postOffset: 0,
      loadPosts: jest.fn(),
      hasLoaded: false,
    };

    const tree = shallow(<FrontPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
