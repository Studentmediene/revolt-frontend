import React from "react";
import PlayPauseButton from '../../common/button/PlayPauseButton/PlayPauseButton';
import MobileStyles from "./MobilePlayer.scss";
import PlayingInfo from "./PlayingInfo";

const MobilePlayer = (props) => {

    return (
        <React.Fragment>
            <div className={MobileStyles.metaContainer}>
            <div className={MobileStyles.timeline} style={props.audioProgressStyle} />
            <div className={MobileStyles.container}>
                <PlayingInfo
                showName={props.playingShow}
                episodeTitle={props.playingTitle}
                showImageURL={props.getShowImage()}
                expand={props.toggleExpander}
                live={props.live}
                />
                <div className={MobileStyles.controlContainer}>
                <PlayPauseButton
                    paused={props.paused}
                    togglePlayPause={props.togglePlayPause}
                />
                </div>
            </div>
            </div>
        </React.Fragment>
        )
}

export default MobilePlayer;