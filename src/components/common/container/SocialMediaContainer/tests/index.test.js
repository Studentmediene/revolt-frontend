import React from 'react';
import { shallow } from 'enzyme';

import SocialMediaContainer from '../';

describe('<SocialMediaContainer />', () => {
  it('renders correctly', () => {
    const tree = shallow(<SocialMediaContainer />);
    expect(tree).toMatchSnapshot();
  });
});
