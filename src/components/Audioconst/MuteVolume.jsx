import React from "react";
import MuteVolumeIcon from "../../../../webescuela/src/components/Icons/MuteVolume";
export default function MuteVolume(props) {
  const { handleClick, color } = props;

  return (
    <button className="bar__volume" onClick={() => handleClick()}>
      <MuteVolumeIcon color={color} />
    </button>
  );
}
