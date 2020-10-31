import React, { useRef, memo } from 'react';

import ImageBlock from '@components/Block/imageBlock';
import AudioBlock from '@components/Block/audioBlock';
import VideoBlock from '@components/Block/VideoBlock';
import EditorBlock from '@components/Block/EditorBlock';
import DoubleEditorBlock from '@components/Block/DoubleEditorBlock';
import LinkBlock from '@components/Block/LinkBlock';
import VocabularyBlock from '@components/Block/VocabularyBlock';
import TestBlock from '@components/Block/TestBlock';
import ExerciseBlock from '@components/Block/exerciseBlock';

import Move from '@assets/images/blocks/move.svg';
import Copy from '@assets/images/blocks/copy.svg';
import Delete from '@assets/images/blocks/delete.svg';

const Block = ({ actions: { onCopy, onDelete }, type, onStateChange, id, preloadedState }) => {
  const actionsRef = useRef(null);
  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <ImageBlock
            id={id}
            onStateChange={onStateChange}
            preloadedState={preloadedState}
          />
        );
      case 'audio':
        return (
          <AudioBlock
            id={id}
            onStateChange={onStateChange}
            preloadedState={preloadedState}
          />
        );
      case 'video':
        return (
          <VideoBlock
            id={id}
            onStateChange={onStateChange}
            preloadedState={preloadedState}
          />
        );
      case 'link':
        return (
          <LinkBlock
            id={id}
            onStateChange={onStateChange}
            preloadedState={preloadedState}
            actionsRef={actionsRef}
          />
        );
      case 'vocabulary':
        return (
          <VocabularyBlock
            id={id}
            onStateChange={onStateChange}
            preloadedState={preloadedState}
          />
        );
      case 'test':
        return (
          <TestBlock
            id={id}
            onStateChange={onStateChange}
            preloadedState={preloadedState}
          />
        );
      case 'exercise':
        return (
          <ExerciseBlock
            id={id}
            onStateChange={onStateChange}
            preloadedState={preloadedState}
          />
        );
    }
  };

  return (
    <>
      {
        (() => {
          if (type === 'editor') {
            return (
              <EditorBlock
                onClickCopy={onCopy}
                onClickDelete={onDelete}
                id={id}
                onStateChange={onStateChange}
                preloadedState={preloadedState}
              />
            )
          } else if (type === 'action-editor') {
            return (
              <DoubleEditorBlock
                onClickCopy={onCopy}
                onClickDelete={onDelete}
                id={id}
                onStateChange={onStateChange}
                preloadedState={preloadedState}
              />
            )
          } else {
            return (
              <>
                <div className="block">
                  <div className="actions-container">
                    <div className="left-side-actions">
                      <img
                        src={Move}
                        alt="move"
                      />
                    </div>
                    <div className="right-side-actions">
                      <div ref={actionsRef} className="sub-actions" />
                      <img
                        src={Copy}
                        onClick={onCopy}
                        alt="Copy"
                      />
                      <img
                        src={Delete}
                        onClick={onDelete}
                        alt="Delete"
                      />
                    </div>
                  </div>
                  <div className="content-container">
                    {renderContent()}
                  </div>
                </div>
              </>
            )
          }
        })()
      }
    </>
  );
};

export default Block;
