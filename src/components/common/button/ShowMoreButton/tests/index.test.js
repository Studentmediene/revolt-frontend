import React from 'react';
import { shallow } from 'enzyme';

import ShowMoreButton from '../';

describe('<ShowMoreButton />', () => {
  it('renders correctly when active', () => {
    const mockProps = {
      active: true,
      onClick: jest.fn(),
      text: 'text',
    };
    const tree = shallow(<ShowMoreButton {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when inactive', () => {
    const mockProps = {
      active: false,
      onClick: jest.fn(),
      text: 'text',
    };
    const tree = shallow(<ShowMoreButton {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
});
