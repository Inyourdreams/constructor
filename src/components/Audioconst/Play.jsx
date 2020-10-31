import React from "react";

import PlayIcon from "../../../../webescuela/src/components/Icons/PlayIcon";
export default function Play(props) {
  const { handleClick, color } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <PlayIcon color={color} />
    </button>
  );
}
