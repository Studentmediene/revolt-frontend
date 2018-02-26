import React from 'react';
import { shallow } from 'enzyme';

import PostPreview from '../';

describe('<PostPreview />', () => {
  it('renders correctly with categories', () => {
    const mockProps = {
      croppedImages: {
        large: 'large_image',
        medium: 'medium_image',
        small: 'small_image',
      },
      lead: 'Lead',
      publishAt: '2017-11-01 18:11:44+00:00',
      slug: 'slug',
      title: 'title',
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
    };
    const tree = shallow(<PostPreview {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without categories', () => {
    const mockProps = {
      croppedImages: {
        large: 'large_image',
        medium: 'medium_image',
        small: 'small_image',
      },
      lead: 'Lead',
      publishAt: '2017-11-01 18:11:44+00:00',
      slug: 'slug',
      title: 'title',
    };
    const tree = shallow(<PostPreview {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
});
