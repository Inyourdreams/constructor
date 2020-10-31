import React, { useState, useEffect, useRef, useCallback } from 'react';

import Button from '@components/common/Button';

import Image from '@assets/images/blocks/Image/Image.svg';
import Cross from '@assets/images/blocks/cross.svg';
import Eye from '@assets/images/blocks/eye.svg';
import EyeOff from '@assets/images/blocks/eye-off.svg';
import { uploadFile, refreshToken } from '../../redux/api/googleDrive';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const ImageBlock = ({ onStateChange, id, preloadedState }) => {
  const ref = useRef(null);
  const initialState = {
    isVisibleDescription: false,
    isVisibleForStudent: true,
    description: '',
    image: null,
  };

  const [props, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      (async() => {
        let response = await uploadFile({
          file: item.files[0],
          folderID: JSON.parse(localStorage.getItem('folders')).image
        });
        if (response.status !== 200) {
          const refreshTokenResponse = await refreshToken(localStorage.getItem('refresh_token'));

          if (refreshTokenResponse) {
            response = await uploadFile({
              file: item.files[0],
              folderID: JSON.parse(localStorage.getItem('folders')).image
            });
            const fileJson = await response.json();
            setState({
              ...state,
              image: fileJson.webContentLink,
            });
          }
        } else {
          const fileJson = await response.json();
          setState({
            ...state,
            image: fileJson.webContentLink,
          });
        }
      })();
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [state, setState] = useState(preloadedState || initialState);

  useEffect(() => {
    onStateChange(id, state);
  }, [state]);

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
    })
  };

  const handleChooseFile = async (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      let response = await uploadFile({
        file,
        folderID: JSON.parse(localStorage.getItem('folders')).image
      });
      if (response.status !== 200) {
        const refreshTokenResponse = await refreshToken(localStorage.getItem('refresh_token'));

        if (refreshTokenResponse) {
          response = await uploadFile({
            file,
            folderID: JSON.parse(localStorage.getItem('folders')).image
          });
          const fileJson = await response.json();
          setState({
            ...state,
            image: fileJson.webContentLink,
          });
        }
      } else {
        const fileJson = await response.json();
        setState({
          ...state,
          image: fileJson.webContentLink,
        });
      }
    }
  };

  return (
    <div ref={drop} className="aaa" onClick={() => {
      ref.current.click();
    }}>
      {
        !state.image ? (
          <>
            <img
              src={Image}
              className="block-icon"
              alt="image"
            />
            <span className="block-title">
        Добавить изображение
        </span>
            <span className="block-description">
        Кликните на выделенную область или перетащите файл
        </span>
            {
              state.isVisibleDescription ? (
                <div className="block-description-area-container">
        <textarea
          className="block-description-area"
          placeholder="Описание изображения"
          onChange={handleChangeDescription}
          onClick={(e) => {
            e.stopPropagation();
          }}
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
            <input
              style={{ display: 'none' }}
              ref={ref}
              onChange={handleChooseFile}
              type="file"
              accept="image/*"
            />
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <img style={{ maxWidth: 600, borderRadius: 16 }} src={state.image} alt=""/>
            <img
              onClick={() => {
                setState({
                  ...state,
                  image: null,
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
        !state.isVisibleDescription ? (
          <Button
            className="block-action"
            onClick={handleDescription}
          >
            Добавить описание
          </Button>
        ) : null
      }
      {
        state.isVisibleDescription && state.image ? (
          <div className="block-description-area-container">
        <textarea
          className="block-description-area"
          placeholder="Описание изображения"
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
    </div>
  );
};

export default ImageBlock;
