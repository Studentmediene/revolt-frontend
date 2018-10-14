import React from 'react';
import { shallow } from 'enzyme';

import ShowHeader from '../';

describe('<ShowHeader />', () => {
  it('renders correctly', () => {
    const mockShow = {
      title: 'Title',
      content: '<p>Content</p>',
      logoImageUrl: 'Image url',
      categories: [{ name: 'category1' }, { name: 'category2' }],
    };

    const tree = shallow(<ShowHeader show={mockShow} />);
    expect(tree).toMatchSnapshot();
  });
});
