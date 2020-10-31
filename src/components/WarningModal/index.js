import React, { useCallback } from 'react';
import Modal, { defaultStyles, setAppElement } from 'react-modal';

import ModalHeader from '@components/common/Modal/ModalHeader';
import ModalActions from '@components/common/Modal/ModalActions';

const customStyles = {
  content: {
    border: 0,
    background: 'transparent',
    height: '100%',
  },
};

defaultStyles.overlay.backgroundColor = 'rgba(48, 72, 89, 0.73)';
defaultStyles.overlay.zIndex = 1071;
setAppElement('#root');

const WarningModal = ({
  visibility,
  onSubmit,
  onClose,
  localization: {
    title,
    description,
    actionCreate,
    actionCancelCreation,
  },
}) => {
  const handleCloseModal = useCallback(() => {
    onClose(false);
  }, []);

  return(
    <Modal
      isOpen={visibility}
      style={customStyles}
    >
      <div className="modal-container">
        <div className="modal">
          <ModalHeader
            type="warning"
            localization={{
              title,
              description,
            }}
          />
          <ModalActions
            onSubmit={onSubmit}
            onClose={handleCloseModal}
            localization={{
              actionCreate,
              actionCancelCreation,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default WarningModal;
