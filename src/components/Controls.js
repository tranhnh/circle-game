import React from 'react';

function Controls({ 
  playerName, 
  setPlayerName, 
  points, 
  setPoints, 
  gameStarted, 
  handleStartGame, 
  resetGame, 
  setAutoPlay, 
  autoPlay 
}) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        disabled={gameStarted}
      />
      <input
        type="number"
        min="0"
        value={points || ''}
        onChange={(e) => setPoints(parseInt(e.target.value, 10) || 0)}
        disabled={gameStarted}
        placeholder="Enter points"
      />
      <button
        onClick={handleStartGame}
        disabled={points <= 0 || !playerName || gameStarted}
        className={gameStarted ? 'disabled' : 'start'}
      >
        {gameStarted ? 'Game in Progress' : 'Start Game'}
      </button>
      <button onClick={resetGame} className="reset">
        Reset Game
      </button>
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        disabled={!gameStarted}
        className={`auto-play ${autoPlay ? 'active' : ''}`}
      >
        {autoPlay ? 'Stop Auto Play' : 'Start Auto Play'}
      </button>
    </div>
  );
}

export default Controls;
