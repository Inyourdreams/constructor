import React, { useState, useEffect } from 'react';

import RichEditorExample from '@components/DoubleTextEditor';

const EditorBlock = ({ onClickDelete, onClickCopy, preloadedState, onStateChange, id }) => {

  return (
    <div className="aaa">
      <RichEditorExample
        onClickCopy={onClickCopy}
        onClickDelete={onClickDelete}
        onStateChange={onStateChange}
        id={id}
        preloadedState={preloadedState}
      />
    </div>
  );
};

export default EditorBlock;
