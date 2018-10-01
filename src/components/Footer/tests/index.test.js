import React from 'react';
import { shallow } from 'enzyme';

import { Footer } from '../';

describe('<Footer />', () => {
  it('renders correctly', () => {
    const props = {
      chiefEditor: 'chiefEditor',
      radioEditor: 'radioEditor',
      loading: false,
      error: false,
      loadFooter: jest.fn(),
    };

    const tree = shallow(<Footer {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly while loading', () => {
    const props = {
      chiefEditor: 'chiefEditor',
      radioEditor: 'radioEditor',
      loading: true,
      error: false,
      loadFooter: jest.fn(),
    };

    const tree = shallow(<Footer {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly on error', () => {
    const props = {
      chiefEditor: 'chiefEditor',
      radioEditor: 'radioEditor',
      loading: false,
      error: true,
      loadFooter: jest.fn(),
    };

    const tree = shallow(<Footer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
