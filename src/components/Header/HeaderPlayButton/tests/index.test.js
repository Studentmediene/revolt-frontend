import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import ConnectedHeaderPlayButton, { HeaderPlayButton } from '../';
import { playLive } from 'components/Player/actions';

describe('<HeaderPlayButton />', () => {
  it('renders correctly', () => {
    const mockProps = {
      playLive: jest.fn(),
    };
    const tree = shallow(<HeaderPlayButton {...mockProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('calls playLive when clicked', () => {
    const mockProps = {
      playLive: jest.fn(),
    };
    const tree = mount(<HeaderPlayButton {...mockProps} />);
    tree.find('.playButton').simulate('click');
    expect(mockProps.playLive).toBeCalled();
  });

  it('dispatches action when clicked', () => {
    const mockStore = configureStore();
    const store = mockStore({});
    const tree = mount(
      <Provider store={store}>
        <ConnectedHeaderPlayButton />
      </Provider>,
    );
    tree.find('.playButton').simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([playLive()]);
  });

  it('dispatches action on keyPress', () => {
    const mockStore = configureStore();
    const store = mockStore({});
    const tree = mount(
      <Provider store={store}>
        <ConnectedHeaderPlayButton />
      </Provider>,
    );
    tree.find('.playButton').simulate('keyPress');
    const actions = store.getActions();
    expect(actions).toEqual([playLive()]);
  });
});
