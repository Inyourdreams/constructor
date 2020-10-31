import React, { useEffect, useState } from 'react';

import Cross from '@assets/images/blocks/cross.svg';
import Plus from '@assets/images/blocks/plus.svg';

const vocabularyBlock = ({ onStateChange, id, preloadedState }) => {
  const initialState = {
    words: [{
      id: 1,
      original: '',
      translation: '',
    }],
  };

  const [state, setState] = useState(preloadedState || initialState);

  useEffect(() => {
    onStateChange(id, state);
  }, [state]);

  return (
    <div className="aaa">
      {
        state.words.map(({ id, original, translation }, index) => (
          <div key={id} className="vocabulary-block">
            <input
              type="text"
              className="vocabulary-area"
              placeholder="Введите слово или фразу"
              onChange={(e) => {
                setState({
                  ...state,
                  words: state.words.map((word) => {
                    if (word.id === id) {
                      return {
                        id,
                        translation,
                        original: e.target.value,
                      };
                    }
                    return word;
                  })
                })
              }}
              value={original}
              style={{ borderBottom: index === state.words.length - 1 ? '1px solid #C2CFE0' : '' }}
            />
            <input
              type="text"
              className="vocabulary-area"
              placeholder="а здесь - перевод"
              // onChange={handleChangeDescription}
              value={translation}
              onChange={(e) => {
                setState({
                  ...state,
                  words: state.words.map((word) => {
                    if (word.id === id) {
                      return {
                        id,
                        original,
                        translation: e.target.value,
                      };
                    }
                    return word;
                  })
                })
              }}
              style={{ borderBottom: index === state.words.length - 1 ? '1px solid #C2CFE0' : '' }}
            />
            <img onClick={() => {
              setState({
                ...state,
                words: state.words.filter((item) => item.id !== id)
              })
            }} style={{ padding: '0 20px', cursor: 'pointer' }} src={Cross} alt=""/>
          </div>
        ))
      }
      <div className="centered-icon-voc"
           onClick={() => {
             setState({
               ...state,
               words: [...state.words, {
                 id: state.words.length ? state.words[state.words.length - 1].id + 1 : 0,
                 original: '',
                 transition: '',
               }]
             })
           }}
      >
        <img src={Plus} alt=""/>
      </div>
    </div>
  );
};

export default vocabularyBlock;
