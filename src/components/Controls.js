import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSpinner, faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';

function Controls({ handleStopGame, togglePause, isPaused, playerName, setPlayerName, points, setPoints, handleStartGame, resetGame, autoPlay, setAutoPlay, gameStarted }) {
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
      
      <div className='button-container'>
        <button
          onClick={handleStartGame}
          disabled={points <= 0 || !playerName || gameStarted}
          className={`start ${points <= 0 || !playerName || gameStarted ? 'disabled' : ''}`}
        >
          <FontAwesomeIcon icon={gameStarted ? faSpinner : faPlay} spin={gameStarted} />
        </button>

        {gameStarted && (
          <button
          onClick={togglePause}
          className={`pause ${isPaused ? 'resume' : ''}`}
        >
          <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
          </button>
        )}

        {gameStarted && (
        <button onClick={resetGame} className="reset">
          <FontAwesomeIcon icon={faRedo} />
        </button>
        )}

        {gameStarted && (
          <button
            onClick={handleStopGame}
            disabled={!gameStarted}
            className="stop"
          >
             <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        )}

        {gameStarted && !isPaused && (
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`auto-play ${autoPlay ? 'active' : ''}`}
          >
            {autoPlay ? 'Stop Auto Play' : 'Start Auto Play'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Controls;
