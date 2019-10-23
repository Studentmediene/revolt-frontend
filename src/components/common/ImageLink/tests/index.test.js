import React from 'react';
import { shallow } from 'enzyme';

import ImageLink from '../';

describe('<ImageLink />', () => {
  const props = {
    images: {
      small: '/small.jpg',
      medium: '/medium.jpg',
      large: '/large.jpg',
    },
    as: '/post/actualLink',
    href: '/post/[internalLink]',
    imageDescription: ' img description',
    children: <div>Hello world!</div>,
  };

  it('renders correctly', () => {
    const tree = shallow(<ImageLink {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
