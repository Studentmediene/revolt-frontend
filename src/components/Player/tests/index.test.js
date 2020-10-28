import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from "sinon";

import AudioControls from "../components/AudioControls";
import SkipBackwardsButton from "../components/SkipBackwardsButton";
import PlayingInfoExpanded from '../components/common/PlayingInfoExpanded';

const AudioControlsProps = {
    playNext: test,
    playPrevious: test,
    togglePlayPause: test,
    paused: true,
    live: true,
    skipAhead: test,
    skipBackwards: test
    }

    
describe("<AudioControls/>", () => {
    it("renders one skipbackwards-button", () =>{
        const wrapper = shallow(<AudioControls {...AudioControlsProps}/>);
        expect(wrapper.find(<SkipBackwardsButton/>)).toBeTruthy();
    });

    it("simulates click events on skipBackwardsButton", () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<AudioControls {...AudioControlsProps} skipBackwards={onButtonClick}  />)
        const button = wrapper.find(".skipBackwardsButton")
        button.simulate("click");
        expect(onButtonClick).toHaveProperty("callCount", 1);
    })
})


describe("<PlayingInfoExpanded/>", () => {
    const PlayingInfoExpandedProps = {
        showName: "",
        episodeTitle: "",
        showImageURL: "",
        publishAt: "",
        live: true,
        paused: true,
        onSeek: test,
        url: "test",
        position: 0,
        duration: 100000,
        expanded: false,
        isMobile: false,
        playNext: test,
        playPrevious: test,
        toggleExpander: test,
    }
    
    const toggleExpander = () => {(PlayingInfoExpandedProps.expanded = !PlayingInfoExpandedProps.expanded)};
    const skipAhead = jest.fn(PlayingInfoExpandedProps.position = PlayingInfoExpandedProps.position + 30000);

    it("expands on expanderButton click", () => {
    const wrapper = shallow(<PlayingInfoExpanded {...PlayingInfoExpandedProps} toggleExpander={toggleExpander} audioControls={<></>}/>)
        const button = wrapper.find(".expanderButton")
        button.simulate("click");
        expect(PlayingInfoExpandedProps.expanded).toBe(true);
    })
    
    it("skips forwards on skipForwardsButton click", () => {
        const wrapper = mount(<PlayingInfoExpanded {...PlayingInfoExpandedProps} audioControls={<AudioControls {...AudioControlsProps} skipAhead={skipAhead}/>}/>)
        const audioControls = wrapper.find(AudioControls);
        const button = audioControls.find(".skipAheadButton")
        button.simulate("click");
        expect(PlayingInfoExpandedProps.position).toBe(30000);
    })
});