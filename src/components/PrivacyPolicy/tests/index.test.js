import React from 'react';
import { shallow } from 'enzyme';

import PrivacyPolicy from '../';

describe('<PrivacyPolicy />', () => {
  it('renders correctly', () => {
    const tree = shallow(<PrivacyPolicy />);
    expect(tree).toMatchSnapshot();
  });
});
