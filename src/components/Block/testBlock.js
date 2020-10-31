import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';

import Cross from '@assets/images/blocks/cross.svg';
import Move from '@assets/images/blocks/move.svg';
import Comment from '@assets/images/blocks/comment.svg';
import Plus from '@assets/images/blocks/plus.svg';
import Tick from '@assets/images/blocks/tick.svg';


const testBlock = ({ onStateChange, id, preloadedState }) => {
  const initialState = {
    question: '',
    isVarious: false,
    answers: [{
      id: 1,
      text: '',
      comment: false,
      commentText: '',
      selected: true,
    }],
  };

  const [state, setState] = useState(preloadedState || initialState);

  useEffect(() => {
    onStateChange(id, state);
  }, [state]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      answers: prevState.answers.map((item) => ({
        ...item,
        selected: false,
      }))
    }))
  }, [state.isVarious]);

  return (
    <div className="aaa">
      <div className="test-block">
        <input
          type="text"
          className="test-area"
          placeholder="Введите вопрос"
          onChange={(e) => {
            setState({
              ...state,
              question: e.target.value,
            })
          }}
          value={state.question}
        />
        <img onClick={() => {
          setState({
            ...state,
            question: '',
          });
        }} style={{ padding: '0 20px', cursor: 'pointer' }} src={Cross} alt=""/>
      </div>
      <div className="title-block-switch">
        <Switch
          className="test-switch"
          width={30}
          height={16}
          handleDiameter={12}
          uncheckedIcon={null}
          offHandleColor="#8CA4C0"
          onHandleColor="#2C82FF"
          offColor="#DDE4EF"
          onColor="#C7DBFF"
          activeBoxShadow={0}
          checkedIcon={<></>}
          onChange={() => {
            setState({
              ...state,
              isVarious: !state.isVarious
            })
          }} checked={state.isVarious} />
          <span className="test-title-switch">
            Несколько правильных ответов
          </span>
      </div>
      {
        state.answers.map(({ id, text, comment, commentText, selected }) => (
          <React.Fragment key={id}>
            <div className="test-block-answer">
              {
                state.isVarious ? (
                  <div
                    className="test-checkbox"
                    style={{ border: selected ? 0 : '', background: selected ? '#0053D7' : '' }}
                    onClick={() => {
                      setState({
                        ...state,
                        answers: state.answers.map((answer) => {
                          if (answer.id === id) {
                            return {
                              ...answer,
                              selected: !answer.selected,
                            };
                          }
                          return answer;
                        })
                      })
                    }}
                  >
                    {
                      selected ? <img src={Tick} alt=""/> : null
                    }
                  </div>
                ) : (
                  <div
                    style={{ backgroundColor: selected ? '#0053D7' : '' }}
                    className="test-check-box"
                    onClick={() => {
                      setState({
                        ...state,
                        answers: state.answers.map((answer) => {
                          if (answer.id === id) {
                            return {
                              ...answer,
                              selected: true,
                            };
                          } else {
                            return {
                              ...answer,
                              selected: false,
                            };
                          }
                          return answer;
                        })
                      })
                    }}
                  />
                )
              }
              <input
                type="text"
                className="input-test-answer"
                placeholder="Введите текст ответа"
                onChange={(e) => {
                  setState({
                    ...state,
                    answers: state.answers.map((answer) => {
                      if (answer.id === id) {
                        return {
                          ...answer,
                          text: e.target.value,
                        };
                      }
                      return answer;
                    })
                  })
                }}
                value={text}
              />
              <img style={{ marginRight: 22 }} src={Move} alt=""/>
              <img
                style={{ marginRight: 22 }}
                src={Comment}
                onClick={() => {
                  setState({
                    ...state,
                    answers: state.answers.map((answer) => {
                      if (answer.id === id) {
                        return {
                          ...answer,
                          comment: true,
                        };
                      }
                      return answer;
                    })
                  })
                }}
              />
              <img
                onClick={() => {
                  setState({
                    ...state,
                    answers: state.answers.filter((item) => item.id !== id)
                  })
                }}
                src={Cross}
                alt=""
              />
            </div>
            {
              comment ? (
                <div className="test-block-comment">
                  <input
                    className="test-block-comment-area"
                    value={commentText}
                    onChange={(e) => {
                      setState({
                        ...state,
                        answers: state.answers.map((answer) => {
                          if (answer.id === id) {
                            return {
                              ...answer,
                              commentText: e.target.value,
                            };
                          }
                          return answer;
                        })
                      })
                    }}
                  />
                  <img
                    onClick={() => {
                      setState({
                        ...state,
                        answers: state.answers.map((answer) => {
                          if (answer.id === id) {
                            return {
                              ...answer,
                              comment: false,
                            };
                          }
                          return answer;
                        })
                      })
                    }}
                    style={{ marginLeft: 22 }}
                    src={Cross}
                    alt=""
                  />
                </div>
              ) : null
            }
          </React.Fragment>
        ))
      }
      <div className="centered-icon-voc"
           onClick={() => {
             setState({
               ...state,
               answers: [...state.answers, {
                 id: state.answers.length ? state.answers[state.answers.length - 1].id + 1 : 0,
                 text: '',
                 comment: null,
                 selected: false,
               }]
             })
           }}
      >
        <img src={Plus} alt=""/>
      </div>
    </div>
  );
};

export default testBlock;
