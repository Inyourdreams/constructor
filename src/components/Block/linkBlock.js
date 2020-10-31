import React, { useEffect, useState } from 'react';

import Center from '@assets/images/blocks/Link/centered-icon.svg';
import CenterActive from '@assets/images/blocks/Link/centered-icon-active.svg';
import Left from '@assets/images/blocks/Link/left-icon.svg';
import LeftActive from '@assets/images/blocks/Link/left-icon-active.svg';

const LinkBlock = ({ onStateChange, id, preloadedState, actionsRef }) => {
  const initialState = {
    align: 'center',
    link: '',
    name: '',
  };

  const [state, setState] = useState(preloadedState || initialState);

  const handleCenter = () => {
    setState((prevState) => ({
      ...prevState,
      align: 'center',
    }));
  };

  const handleLeft = () => {
    setState((prevState) => ({
      ...prevState,
      align: 'left',
    }));
  }

  useEffect(() => {
    const center = document.createElement('div');
    center.innerHTML = `
<img class="link-left-icon-${id}" style="margin-right: 20px" src=${state.align === 'left' ? LeftActive : Left} />
<img class="link-center-icon-${id}" src=${state.align === 'center' ? CenterActive : Center} />
`;
    center.style.marginRight = '60px';
    if (!actionsRef.current.children.length) {
      actionsRef.current.append(center);
    }
    document.querySelector(`.link-left-icon-${id}`).addEventListener('click', handleLeft);
    document.querySelector(`.link-center-icon-${id}`).addEventListener('click', handleCenter);

  }, [actionsRef.current, state]);

  useEffect(() => {
    onStateChange(id, state);
    document.querySelector(`.link-center-icon-${id}`).removeEventListener('click', handleCenter);
    document.querySelector(`.link-left-icon-${id}`).removeEventListener('click', handleLeft);
  }, [state]);

  return (
    <div className="aaa">
      <textarea
        className="block-description-area-link"
        placeholder="Вставьте ссылку"
        onChange={(e) => {
          setState({
            ...state,
            link: e.target.value,
          })
        }}
        style={{
          textDecoration: state.link ? 'underline' : 'none'
        }}
        value={state.link}
      />
      <textarea
        className="block-description-area-link"
        placeholder="Название ссылки"
        onChange={(e) => {
          setState({
            ...state,
            name: e.target.value,
          })
        }}
        style={{
          textDecoration: state.name ? 'underline' : 'none',
          textAlign: state.align
        }}
        value={state.name}
      />
    </div>
  );
};

export default LinkBlock;
