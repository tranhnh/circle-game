import React from 'react';
import './Circle.css';

function Circle({ id, x, y, onClick, totalCircles, nextNumber, isHidden }) {
  const circleClasses = [
    'circle',
    isHidden ? 'circle--hidden' : '',
    id === nextNumber ? 'next-number' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      data-circle-id={id}
      className={circleClasses}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: id === nextNumber ? totalCircles + 1 : totalCircles - id,
      }}
      onClick={onClick}
    >
      {id}
    </div>
  );
}

export default Circle;
