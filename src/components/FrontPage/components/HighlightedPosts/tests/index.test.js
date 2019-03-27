import React from 'react';
import { shallow } from 'enzyme';

import HighlightedPosts from '../';

describe('<HighlightedPosts />', () => {
  const props = {
    posts: [],
  };

  it('renders correctly', () => {
    const tree = shallow(<HighlightedPosts {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
