import React from 'react';
import { shallow } from 'enzyme';

import LoadPostsButton from '../';

describe('<LoadPostsButton />', () => {
  const props = {
    loadPosts: jest.fn(),
  };

  it('renders correctly', () => {
    const tree = shallow(<LoadPostsButton {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
