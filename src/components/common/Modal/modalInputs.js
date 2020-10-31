import React from 'react';
import Input from 'input-material-ui';

const ModalInputs = ({
 onChangeField,
 localization: {
   inputPlaceholderName,
   inputPlaceholderDescription,
 },
}) => {
  return (
    <div className="modal-inputs-container">
      <Input
        className="name-input"
        type="text"
        label={inputPlaceholderName}
        onChange={onChangeField.bind({
          target: 'name-field',
        })}
      />
      <Input
        className="description-input"
        type="text"
        label={inputPlaceholderDescription}
        onChange={onChangeField.bind({
          target: 'description-field',
        })}
      />
    </div>
  );
};

export default ModalInputs;
