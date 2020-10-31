import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import Play from './Play';
import Pause from './Pause';
import Close from './Close';
import Volume from './Volume';
import MuteVolume from './MuteVolume';
export default function Bar(props) {
  const { duration, curTime, onTimeUpdate, playing, setPlaying, setHidePlayer, mute, setMute, toHeader } = props;

  const curPercentage = (curTime / duration) * 100;

  function formatDuration(duration) {
    return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
  }

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX;
    const bar = toHeader ? document.querySelector('.bar__progress_header') : document.querySelector('.bar__progress');
    const barStart = bar.getBoundingClientRect().left + window.scrollX;

    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;

    return timePerPixel * clickPositionInBar;
  }

  function handleTimeDrag(e) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener('mousemove', updateTimeOnMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove);
    });
  }

  const color = '#336A93';
  return (
    <div className='bar'>
      {playing ? (
        <Pause color={color} handleClick={() => setPlaying(false)} />
      ) : (
        <Play color={color} handleClick={() => setPlaying(true)} />
      )}

      <span className='bar__time'>
        {formatDuration(curTime)}/{formatDuration(duration)}
      </span>

      <div
        className={toHeader ? 'bar__progress_header' : 'bar__progress'}
        style={{
          background: `linear-gradient(to right, ${color} ${curPercentage}%, RGBA(144,164,189,0.5)  0)`,
        }}
        onMouseDown={(e) => handleTimeDrag(e)}
      ></div>

      {mute ? (
        <MuteVolume color={color} handleClick={() => setMute(false)} />
      ) : (
        <Volume color={color} handleClick={() => setMute(true)} />
      )}
      {toHeader && <Close handleClick={() => setHidePlayer(true)} />}
    </div>
  );
}
