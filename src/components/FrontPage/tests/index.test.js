import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable'

import { FrontPage } from '../';

describe('<FrontPage />', () => {
  it('renders correctly', () => {
    const stateProps = {
      posts: Immutable.List(),
      highlightedPosts: Immutable.List(),
      loading: false,
      error: false,
      postOffset: 0,
      hasLoaded: false,
    };

    const actionProps = {
      loadPosts: jest.fn(),
    }

    const tree = shallow(<FrontPage {...stateProps} {...actionProps} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly while loading', () => {
    const stateProps = {
      posts: Immutable.List(),
      highlightedPosts: Immutable.List(),
      loading: true,
      error: false,
      postOffset: 0,
      hasLoaded: false,
    };

    const actionProps = {
      loadPosts: jest.fn(),
    }

    const tree = shallow(<FrontPage {...stateProps} {...actionProps} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly on error', () => {
    const stateProps = {
      posts: Immutable.List(),
      highlightedPosts: Immutable.List(),
      loading: false,
      error: true,
      postOffset: 0,
      hasLoaded: false,
    };

    const actionProps = {
      loadPosts: jest.fn(),
    }

    const tree = shallow(<FrontPage {...stateProps} {...actionProps} />);
    expect(tree).toMatchSnapshot();
  });
});
