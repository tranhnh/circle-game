import React from 'react';

function Stats({ showHistory, setShowHistory, history, formatTime }) {
  return (
    <div className="stats">
      <button 
        className="history-button"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>
      
      {showHistory && history.length > 0 && (
        <div className="history-list">
          <h3>🏆 Leaderboard (Ranked by Time ⏰):</h3>
          {history.map((score, index) => (
            <div key={index} className="history-item">
              #{index + 1} {score.playerName || 'Anonymous'} - Time: {formatTime(score.time)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stats;
