import React from "react";
import VolumeIcon from "../../../../webescuela/src/components/Icons/Volume";
export default function Volume(props) {
  const { handleClick, color } = props;

  return (
    <button className="bar__volume" onClick={() => handleClick()}>
      <VolumeIcon color={color} />
    </button>
  );
}
