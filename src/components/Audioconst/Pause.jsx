import React from "react";
import PauseIcon from "../../../../webescuela/src/components/Icons/Pause";

export default function Play(props) {
  const { handleClick, color } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <PauseIcon color={color} />
    </button>
  );
}
