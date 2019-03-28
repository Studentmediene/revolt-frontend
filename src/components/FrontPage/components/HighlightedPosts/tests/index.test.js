import React from 'react';
import { shallow } from 'enzyme';

import HighlightedPosts from '../';

describe('<HighlightedPosts />', () => {
  const emptyProps = {
    posts: false,
  };

  it('renders correctly when empty', () => {
    const tree = shallow(<HighlightedPosts {...emptyProps} />);
    expect(tree).toMatchSnapshot();
  });

  const noPostsProps = {
    posts: [],
  };

  it('renders correctly when there are no posts', () => {
    const tree = shallow(<HighlightedPosts {...noPostsProps} />);
    expect(tree).toMatchSnapshot();
  });

  const props = {
    posts: [
      {
        id: 364,
        croppedImages: {
          large: '/large1.jpg',
          medium: '/medium1.jpg',
          small: '/small1.jpg',
        },
        title: 'title1',
        slug: 'slug1',
      },
      {
        id: 362,
        croppedImages: {
          large: '/large2.jpg',
          medium: '/medium2.jpg',
          small: '/small2.jpg',
        },
        title: 'title2',
        slug: 'slug2',
      },
    ],
  };

  it('renders correctly', () => {
    const tree = shallow(<HighlightedPosts {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
