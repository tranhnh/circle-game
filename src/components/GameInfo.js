import React from 'react';


function GameInfo({ time, gameStarted, nextNumber }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-info">
      <div className="info-card">
        <h3>Time</h3>
        <span>{formatTime(time)}</span>
      </div>
      {gameStarted && (
        <div className="info-card">
          <h3>Found</h3>
          <span>{nextNumber-1}</span>
        </div>
      )}
    </div>
  );
}

export default GameInfo;
