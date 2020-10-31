import React, { useCallback, useState } from 'react';
import Modal, { defaultStyles, setAppElement } from 'react-modal';

import ModalHeader from '@components/common/Modal/modalHeader';
import ModalMedia from '@components/common/Modal/modalMedia';
import ModalInputs from '@components/common/Modal/modalInputs';
import ModalActions from '@components/common/Modal/modalActions';

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

const CreationModal = ({
  visibility,
  onSubmit,
  onClose,
  localization: {
    title,
    mediaTitle,
    inputFileTitle,
    inputFileSize,
    inputPlaceholderName,
    inputPlaceholderDescription,
    actionCreate,
    actionCancelCreation,
  },
}) => {
  const initialState = {
    image: null,
    name: '',
    description: '',
  };

  const [state, setState] = useState(initialState);

  const handleChooseImage = useCallback((image) => {
    setState((prevState) => ({
      ...prevState,
      image,
    }));
  }, [state]);

  const handleChooseField = useCallback(function(value) {
    switch (this.target) {
      case 'name-field':
        setState({
          ...state,
          name: value,
        });
        break;
      case 'description-field':
        setState({
          ...state,
          description: value,
        });
        break;
    }
  }, [state]);

  const handleCloseModal = useCallback(() => {
    onClose(false);
    setState(initialState);
  }, []);

  const handleSubmitModal = useCallback(() => {
    onSubmit(state);
    setState(initialState);
  }, [state]);

  return(
    <Modal
      isOpen={visibility}
      style={customStyles}
    >
      <div className="modal-container">
        <div className="modal">
          <ModalHeader
            localization={{
              title,
            }}
          />
          <ModalMedia
            onChooseImage={handleChooseImage}
            localization={{
              mediaTitle,
              inputFileTitle,
              inputFileSize,
            }}
          />
          <ModalInputs
            onChangeField={handleChooseField}
            localization={{
              inputPlaceholderName,
              inputPlaceholderDescription,
            }}
          />
          <ModalActions
            onSubmit={handleSubmitModal}
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

export default CreationModal;
