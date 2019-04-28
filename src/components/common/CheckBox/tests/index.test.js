import React from 'react';
import { shallow } from 'enzyme';

import CheckBox from '../';

describe('<CheckBox />', () => {
  const props = {};

  it('renders correctly', () => {
    const tree = shallow(<CheckBox {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
