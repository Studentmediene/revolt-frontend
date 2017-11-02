import React from 'react';
import { shallow } from 'enzyme';

import PostPreviewList from '../';

describe('<PostPreviewList />', () => {
  it('renders correctly with posts', () => {
    const mockProps = {
      posts: [
        {
          image: 'image',
          lead: 'Lead',
          publishAt: '2017-11-01 18:11:44+00:00',
          slug: 'slug1',
          title: 'post1',
          categories: [
            {
              backgroundColor: '#FFFFFF',
              name: 'categoryName1',
              textColor: '#000000',
            },
            {
              backgroundColor: '#FFFFFF',
              name: 'categoryName1',
              textColor: '#000000',
            },
          ],
        },
        {
          image: 'image',
          lead: 'Lead',
          publishAt: '2017-11-01 18:11:44+00:01',
          slug: 'slug2',
          title: 'post2',
          categories: [],
        },
      ],
    };
    const tree = shallow(<PostPreviewList {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly without posts', () => {
    const mockProps = {
      posts: [],
    };
    const tree = shallow(<PostPreviewList {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
});
