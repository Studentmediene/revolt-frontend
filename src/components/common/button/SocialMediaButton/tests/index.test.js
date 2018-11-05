import React from 'react';
import { shallow } from 'enzyme';

import SocialMediaButton from '../';

describe('<SocialMediaButton />', () => {
  it('renders correctly', () => {
    const props = {
      link: 'link',
      image: 'image',
      text: 'text',
    };
    const tree = shallow(<SocialMediaButton {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
