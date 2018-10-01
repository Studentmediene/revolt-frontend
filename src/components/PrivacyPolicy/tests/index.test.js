import React from 'react';
import { shallow } from 'enzyme';

import { PrivacyPolicy } from '../';

describe('<PrivacyPolicy />', () => {
  it('renders correctly', () => {
    const props = {
      privacyPolicy: '<p>privacyPolicy</p>',
      loading: false,
      error: false,
      loadPrivacyPolicy: jest.fn(),
    };

    const tree = shallow(<PrivacyPolicy {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly while loading', () => {
    const props = {
      privacyPolicy: '<p>privacyPolicy</p>',
      loading: true,
      error: false,
      loadPrivacyPolicy: jest.fn(),
    };

    const tree = shallow(<PrivacyPolicy {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly on error', () => {
    const props = {
      privacyPolicy: '<p>privacyPolicy</p>',
      loading: false,
      error: true,
      loadPrivacyPolicy: jest.fn(),
    };

    const tree = shallow(<PrivacyPolicy {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
