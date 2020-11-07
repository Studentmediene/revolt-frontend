import React from "react";
import PlayingInfo from "./PlayingInfo";
import AudioTimeline from "./AudioTimeline";
import Expander from "../../common/button/ExpanderButton/Expander"
import LiveTag from "../../common/LiveTag/LiveTag";

import DesktopStyles from "./DesktopPlayer.scss";

const DesktopPlayer = (props) => {

    return(
        <>
          <div className={DesktopStyles.container} title={props.playingTitle}>
            <div className={DesktopStyles.audioControls}>{props.audioControls}</div>
            <div className={DesktopStyles.playingInfoContainer}>
              <PlayingInfo
                showName={props.playingShow}
                episodeTitle={props.playingTitle}
                showImageURL={props.getShowImage()}
                expand={props.toggleExpander}
                live={props.live}
              />
            </div>
            <div className={DesktopStyles.progressBar}>
              <AudioTimeline
                onSeek={position => props.onSeek(position)}
                paused={props.paused}
                live={props.live}
                url={props.url}
                position={props.sound.position}
                duration={props.sound.duration}
              />
            </div>
            <div className={DesktopStyles.expander}>
              <Expander expandFunction={props.toggleExpander} expanded={false} />
            </div>
            {props.live ? (
              <div className={DesktopStyles.liveTag}>
                <LiveTag />
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
    )
}

export default DesktopPlayer;