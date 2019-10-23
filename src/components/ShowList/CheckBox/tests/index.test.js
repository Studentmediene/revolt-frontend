import React from 'react';
import { shallow } from 'enzyme';

import CheckBox from '../';

describe('<CheckBox />', () => {
  const props = {
    label: 'Kultur',
    isSelected: true,
    onCheckboxChange: () => 0,
  };

  it('renders correctly', () => {
    const tree = shallow(<CheckBox {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
