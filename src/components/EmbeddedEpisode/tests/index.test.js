import React from 'react';
import { shallow, mount } from 'enzyme';

import { EmbeddedEpisode } from '../';

describe('<EmbeddedEpisode />', () => {
  const defaultProps = {
    digasBroadcastId: 123,
    id: 123,
    title: 'Episode title',
    lead: 'Episode lead',
    playOnDemand: jest.fn(),
    togglePlayPause: jest.fn(),
    publishAt: '2014-09-08T08:02:17-05:00',
    paused: true,
  };

  it('renders correctly', () => {
    const mockProps = {
      ...defaultProps,
    };
    const tree = shallow(<EmbeddedEpisode {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('should return null on invalid digasBroadcastId', () => {
    const mockProps = {
      ...defaultProps,
      digasBroadcastId: 0,
    };
    const tree = shallow(<EmbeddedEpisode {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('calls playOnDemand when clicked', () => {
    const mockProps = {
      ...defaultProps,
    };
    const tree = mount(<EmbeddedEpisode {...mockProps} />);
    tree.find('.episode').simulate('click');
    expect(mockProps.playOnDemand).toBeCalled();
  });

  it('calls playOnDemand on keyPress', () => {
    const mockProps = {
      ...defaultProps,
    };
    const tree = mount(<EmbeddedEpisode {...mockProps} />);
    tree.find('.episode').simulate('keypress');
    expect(mockProps.playOnDemand).toBeCalled();
  });
});
