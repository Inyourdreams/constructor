import React from 'react';

import Button from '@components/common/Button';

const ModalActions = ({
  onSubmit,
  onClose,
  localization: {
    actionCreate,
    actionCancelCreation,
  }
}) => (
  <div className="modal-actions-container">
    <Button
      className="creation"
      onClick={onSubmit}
    >
      {actionCreate}
    </Button>
    <Button
      className="transparent"
      onClick={onClose}
    >
      {actionCancelCreation}
    </Button>
  </div>
);

export default ModalActions;
