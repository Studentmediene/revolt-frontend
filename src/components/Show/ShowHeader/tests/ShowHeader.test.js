import React from 'react';
import { shallow } from 'enzyme';

import ShowHeader from '../';

describe('<NavBar />', () => {
  it('renders correctly', () => {
    const mockShow = {
      title: 'Title',
      content: '<p>Content</p>',
      logoImageUrl: 'Image url',
    };

    const tree = shallow(<ShowHeader show={mockShow} />);
    expect(tree).toMatchSnapshot();
  });
});
