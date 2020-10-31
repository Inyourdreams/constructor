import React from 'react';
import { useDrag } from 'react-dnd';

const DragCard = ({ type, icon, name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type },
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="drag-card"
      style={{
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <img
        className="drag-card-icon"
        src={icon}
        alt="icon"
      />
      <span className="drag-card-text">
        {name}
      </span>
    </div>
  );
};

export default DragCard;
