import React from 'react';

function Stats({ showHistory, setShowHistory, history, formatTime }) {
  return (
    <div className="stats">
      {history.length > 0 && (
        <div className="history-list">
          <h3>Leaderboard (Ranked by Time ⏰):</h3>
          {history.map((points, index) => (
            <div key={points.id} className="history-item">
              #{index + 1} {points.playerName} - Time: {formatTime(points.time)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stats;
