import React, { useCallback } from 'react';

const Menu = ({ actions }) => {
  const mockActions = actions.map(({ id, name, onClick }) => {
    const handleClickItem = useCallback((e) => {
      e.stopPropagation();
      onClick();
    });

    return (
      <div
        key={id}
        className="dropdown-item"
        onClick={handleClickItem}
      >
      <span className="dropdown-item-name">
        {name}
      </span>
      </div>
    )
  });

  return (
    <div className="dropdown-menu">
      {mockActions}
    </div>
  );
};

export default Menu;
