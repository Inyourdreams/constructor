import React, { useState, useEffect, useRef } from 'react';

import Button from '@components/common/Button';

import Image from '@assets/images/blocks/Video/youtube.svg';
import Cross from '@assets/images/blocks/cross.svg';
import Eye from '@assets/images/blocks/eye.svg';
import EyeOff from '@assets/images/blocks/eye-off.svg';
import ReactPlayer from 'react-player';

const VideoBlock = ({ onStateChange, id, preloadedState }) => {
  const ref = useRef(null);
  const initialState = {
    isVisibleDescription: false,
    isVisibleForStudent: true,
    videoLink: '',
    description: '',
    submitted: false,
  };

  const [state, setState] = useState(preloadedState || initialState);

  useEffect(() => {
    onStateChange(id, state);
  }, [state]);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('keydown', ({ key }) => {
        if (key === 'Enter') {
          setState((prevState) => {
            return ({
              ...prevState,
              submitted: true,
            });
          })
        }
      })
    }
  }, [ref]);

  const handleDescription = (e) => {
    e.stopPropagation();
    setState({
      ...state,
      isVisibleDescription: true,
    });
  };

  const handleCloseDescription = (e) => {
    e.stopPropagation();
    setState({
      ...state,
      isVisibleDescription: false,
    });
  };

  const handleShowForStudent = (e) => {
    e.stopPropagation();
    setState({
      ...state,
      isVisibleForStudent: !state.isVisibleForStudent,
    });
  };

  const handleChangeDescription = (e) => {
    e.stopPropagation();
    setState({
      ...state,
      description: e.target.value,
    });
  };

  const handleChangeVideoLink = (e) => {
    setState({
      ...state,
      videoLink: e.target.value,
    });
  }

  return (
    <div className="aaa">
      {
        !state.submitted ? (
          <>
            <img
              src={Image}
              className="block-icon"
              alt="image"
            />
            <span className="block-title">
        Добавить видео
        </span>
            <input
              onChange={handleChangeVideoLink}
              className="block-description-input"
              type="text"
              placeholder="Вставьте ссылку на видео Youtube, Vimeo"
              ref={ref}
              style={{
                marginBottom: 10,
              }}
            />
            {
              state.isVisibleDescription ? (
                <div className="block-description-area-container">
        <textarea
          className="block-description-area"
          placeholder="Описание видео"
          onChange={handleChangeDescription}
          value={state.description}
        />
                  <div className="block-actions-area">
                    <img onClick={handleCloseDescription} src={Cross} alt="" style={{ marginBottom: 22 }}/>
                    {
                      state.isVisibleForStudent ?
                        <img onClick={handleShowForStudent} src={Eye} alt=""/>
                        : <img onClick={handleShowForStudent} src={EyeOff} alt=""/>
                    }
                  </div>
                </div>
              ) : null
            }
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <ReactPlayer
              url={state.videoLink}
            />
            <img
              onClick={() => {
                setState({
                  ...state,
                  submitted: false,
                  videoLink: '',
                  isVisibleDescription: false,
                  isVisibleForStudent: true,
                  description: '',
                })
              }}
              src={Cross}
              alt=""
              style={{ marginLeft: 10 }}
            />
          </div>
        )
      }
      {
        state.isVisibleDescription && state.submitted ? (
          <div style={{ marginTop: 10 }} className="block-description-area-container">
        <textarea
          className="block-description-area"
          placeholder="Описание видео"
          onChange={handleChangeDescription}
          value={state.description}
        />
            <div className="block-actions-area">
              <img onClick={handleCloseDescription} src={Cross} alt="" style={{ marginBottom: 22 }}/>
              {
                state.isVisibleForStudent ?
                  <img onClick={handleShowForStudent} src={Eye} alt=""/>
                  : <img onClick={handleShowForStudent} src={EyeOff} alt=""/>
              }
            </div>
          </div>
        ) : null
      }
      {
        !state.isVisibleDescription ? (
          <Button
            className="block-action"
            onClick={handleDescription}
          >
            Добавить описание
          </Button>
        ) : null
      }
    </div>
  );
};

export default VideoBlock;
