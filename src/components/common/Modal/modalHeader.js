import React from 'react';

const ModalHeader = ({ type, localization: { title, description } }) => {
  switch (type) {
    case 'warning':
      return (
        <div className="warning-modal-header">
         <span className="title">
           {title}
         </span>
         <span className="description">
           {description}
         </span>
        </div>
      );
    default:
      return (
        <div className="modal-header">
         <span className="title">
           {title}
         </span>
        </div>
      );
  }
};

export default ModalHeader;
