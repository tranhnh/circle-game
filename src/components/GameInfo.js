import React from 'react';

function GameInfo({ time, gameStarted, nextNumber }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-info">
      <div className="timer">Time: {formatTime(time)}</div>
      {gameStarted && (
        <div className="next-number">Find Number: {nextNumber}</div>
      )}
    </div>
  );
}

export default GameInfo;
