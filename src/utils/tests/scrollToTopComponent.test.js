import React from 'react';
import { shallow } from 'enzyme';

import { ScrollToTop } from '../scrollToTopComponent';

describe('<ScrollToTop />', () => {
  it('renders correctly', () => {
    const props = {
      children: [<div key={1} />],
      location: {},
    };

    const tree = shallow(<ScrollToTop {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
