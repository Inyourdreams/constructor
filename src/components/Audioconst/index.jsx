import React, { useState, useEffect } from "react";
import Bar from "./Bar";

import "./style.scss";

function Audio(props) {
  const {
    src
  } = props;

  const [playerState, setPlayerState] = useState({
    playing: 'playing',
    paused: 'paused',
    unstarted: 'unstarted',
    buffering: 'buffering',
  });
  const { playing, paused, unstarted } = playerState;
  const videoIsPlaying = partyVideoPlayerState.playerState === playing;
  const setPlaying = () => {
    setPlayerState({
      ...playerState,
      playerState: !videoIsPlaying ? playing : paused,
      prevPlayerState: !videoIsPlaying ? playing : paused,
      timeInVideo: videoProgress,
    });
  };
  const setMute = () => {
    setPlayerMutedState(!videoPlayerIsMuted);
  };
  const setClickedTime = (time) => {
    if (time >= 1) {
      setPlayerState({
        ...playerState,
        playerState: !videoIsPlaying ? playing : paused,
        prevPlayerState: !videoIsPlaying ? playing : paused,
        timeInVideo: videoProgress,
      });
    } else {
      emitNewPlayerStateToServer(
        {
          playerState: videoIsPlaying ? playing : paused,
          prevPlayerState: videoIsPlaying ? playing : paused,
          timeInVideo: 0,
        },
        classID
      );
    }
  };

  return (
    <div className="player">
      <Bar
        mute={videoPlayerIsMuted}
        setMute={setMute}
        toHeader={toHeader}
        playing={videoIsPlaying}
        setPlaying={setPlaying}
        curTime={videoProgress}
        duration={videoDuration}
        onTimeUpdate={(time) => setClickedTime(time)}
        setHidePlayer={setHideAudio}
      />
    </div>
  );
}

export default Audio;
