import React from 'react';
import { shallow, mount } from 'enzyme';

import Episode from '../';

describe('<Episode />', () => {
  it('renders correctly', () => {
    const mockProps = {
      digasBroadcastId: 123,
      id: 123,
      title: 'Episode title',
      lead: 'Episode lead',
      playOnDemand: jest.fn(),
    };
    const tree = shallow(<Episode {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should return null on invalid digasBroadcastId', () => {
    const mockProps = {
      digasBroadcastId: 0,
    };
    const tree = shallow(<Episode {...mockProps} />);
    expect(tree).toMatchSnapshot();

    const nullEpisode = Episode(mockProps);
    expect(nullEpisode).toBeNull();
  });

  it('calls playOnDemand when clicked', () => {
    const mockProps = {
      digasBroadcastId: 123,
      id: 123,
      title: 'Episode title',
      lead: 'Episode lead',
      playOnDemand: jest.fn(),
    };
    const tree = mount(<Episode {...mockProps} />);
    tree.find('.episode').simulate('click');
    expect(mockProps.playOnDemand).toBeCalled();
  });

  it('calls playOnDemand on keyPress', () => {
    const mockProps = {
      digasBroadcastId: 123,
      id: 123,
      title: 'Episode title',
      lead: 'Episode lead',
      playOnDemand: jest.fn(),
    };
    const tree = mount(<Episode {...mockProps} />);
    tree.find('.episode').simulate('keypress');
    expect(mockProps.playOnDemand).toBeCalled();
  });
});
