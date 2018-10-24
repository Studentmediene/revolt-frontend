import React from 'react';
import { shallow } from 'enzyme';

import CategoryTag from '../';

describe('<CategoryTag />', () => {
  it('renders correctly on top', () => {
    const mockProps = {
      position: 'top',
      index: 0,
      name: 'categoryName',
      textColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
    };
    const tree = shallow(<CategoryTag {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly on bottom', () => {
    const mockProps = {
      position: 'bottom',
      index: 0,
      name: 'categoryName',
      textColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
    };
    const tree = shallow(<CategoryTag {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
});
