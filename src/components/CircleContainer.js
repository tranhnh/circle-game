import React from 'react';
import Circle from './Circle/Circle';

function CircleContainer({ gameStarted, circles, handleCircleClick, nextNumber, points }) {
  return (
    <div className="circle-container">
      {gameStarted &&
        circles.map((circle) => (
          <Circle
            key={circle.id}
            {...circle}
            onClick={() => handleCircleClick(circle.id)}
            nextNumber={nextNumber}
            totalCircles={points}
          />
        ))}
    </div>
  );
}

export default CircleContainer;
