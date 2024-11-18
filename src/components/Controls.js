import React from 'react';

function Controls({ togglePause, isPaused, playerName, setPlayerName, points, setPoints, handleStartGame, resetGame, autoPlay, setAutoPlay, gameStarted }) {
  return (
    <div className="controls">
      <div className="controls-row">
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
          onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
          disabled={gameStarted}
          placeholder="Enter points"
        />
      </div>
      
      <div className='container-button'>
        <button
          onClick={handleStartGame}
          disabled={points <= 0 || !playerName || gameStarted}
          className={`start ${points <= 0 || !playerName || gameStarted ? 'disabled' : ''}`}
        >
          {gameStarted ? 'Game in Progress' : 'Start Game'}
        </button>

        {gameStarted && (
        <button onClick={resetGame} className="reset">
          Reset Game
        </button>
        )}

        {gameStarted && (
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`auto-play ${autoPlay ? 'active' : ''}`}
          >
            {autoPlay ? 'Stop Auto Play' : 'Start Auto Play'}
          </button>
        )}
        {gameStarted && (
          <button
          onClick={togglePause}
          className={`pause ${isPaused ? 'resume' : ''}`}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        )}
      </div>
    </div>
  );
}

export default Controls;
