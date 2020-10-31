import React from "react";

import CloseIcon from "../../../../webescuela/src/components/Icons/Close";

export default function Close(props) {
  const { handleClick } = props;

  return (
    <button className="player__button" onClick={() => handleClick()}>
      <CloseIcon />
    </button>
  );
}
