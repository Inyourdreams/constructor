import React, { useState, useEffect } from 'react';
import RichEditorExample from '@components/TextEditor';

const EditorBlock = ({ onStateChange, id, preloadedState, onClickDelete, onClickCopy }) => {

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
