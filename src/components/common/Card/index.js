import React from 'react';

const Card = ({ ref = null, style = {}, className = '', onClick, children }) => (
  <div
    ref={ref}
    onClick={onClick}
    className={`card ${className}`}
    style={style}
  >
    {children}
  </div>
);

export default Card;
