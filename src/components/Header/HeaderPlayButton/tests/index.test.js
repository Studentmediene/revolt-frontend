import React from 'react';
import { shallow } from 'enzyme';

import { HeaderPlayButton } from '../';

describe('<HeaderPlayButton />', () => {
  it('renders correctly', () => {
    const mockProps = {
      paused: true,
      nowPlaying: ' Current show',
      togglePlayPause: jest.fn()
    };
    const tree = shallow(<HeaderPlayButton {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });
});
