import React from 'react';

const Button = ({ className, onClick = null, children }) => (
  <button
    className={`common ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
