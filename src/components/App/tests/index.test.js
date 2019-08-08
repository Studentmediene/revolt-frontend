import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../';

describe('<App />', () => {
  it('renders correctly', () => {
    const props = {
      routes: [],
      pathname: '/path',
    };

    const tree = shallow(<App {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders plainpost correctly', () => {
    const props = {
      routes: [],
      pathname: '/plainpost',
    };

    const tree = shallow(<App {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
