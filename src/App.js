import React, { useState, useEffect } from 'react';
import Circle from './Circle';
import './Circle.css';

function App() {
  const [points, setPoints] = useState(0);
  const [circles, setCircles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [nextNumber, setNextNumber] = useState(1);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: '', message: '' });
  const [playerName, setPlayerName] = useState("");
  

  useEffect(() => {
    let timer;
    if (gameStarted) {
      timer = setInterval(() => setTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted]);

  useEffect(() => {
    if (!autoPlay || !gameStarted) return;

    const nextCircle = circles.find(circle => circle.id === nextNumber);
    if (nextCircle) {
      const timeout = setTimeout(() => {
        const circleElement = document.querySelector(`[data-circle-id="${nextCircle.id}"]`);
        if (circleElement) {
          circleElement.click();
        }
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [autoPlay, nextNumber, circles, gameStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setPoints(value);
    resetGame();
  };

  const resetGame = () => {
    setGameStarted(false);
    setTime(0);
    setNextNumber(1);
    setCircles([]);
    setWrongClicks(0);
    setAutoPlay(false);
  };

  const handleStartGame = () => {
    if (points <= 0 || !playerName) return;
    
    const newCircles = Array.from({ length: points }, (_, i) => ({
      id: i + 1,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }));
    setCircles(newCircles);
    setGameStarted(true);
    setNextNumber(1);
    setTime(0);
    setWrongClicks(0);
  };

  const handleGameWin = () => {
    setGameStarted(false);
    setAutoPlay(false);
    const newHistory = [
      ...history, 
      { playerName, points, time }
    ].sort((a, b) => a.time - b.time) // Sắp xếp theo thời gian nhanh nhất
    .slice(0, 5); // Giới hạn chỉ lưu 5 game nhanh nhất
    setHistory(newHistory);
    
    if (bestTime === null || time < bestTime) {
      setBestTime(time);
    }
    
    setModalInfo({
      type: 'success',
      message: `You completed ${points} points in ${formatTime(time)}!`
    });
    setShowModal(true);
  };

  const handleCircleClick = (id) => {
    if (!gameStarted) return;

    if (id === nextNumber) {
      setNextNumber(prev => prev + 1);
      setCircles(prevCircles =>
        prevCircles.map(circle =>
          circle.id === id ? { ...circle, isHidden: true } : circle
        )
      );
      
      if (id === points) {
        handleGameWin();
      }
    } else {
      setWrongClicks(prev => prev + 1);
      const circles = document.querySelectorAll('.circle');
      circles.forEach(circle => {
        circle.style.animation = 'shake 0.1s';
        setTimeout(() => circle.style.animation = '', 500);
      });

      if (wrongClicks + 1 >= 3) {
        setGameStarted(false);
        setAutoPlay(false);
        setModalInfo({
          type: 'failure',
          message: 'Game Over! You clicked wrong 3 times.'
        });
        setShowModal(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Number Click Game</h1>
        <p>Click the numbers in order as fast as you can!</p>
      </div>

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
          onChange={handleInputChange}
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

      <div className="game-info">
        <div className="timer">Time: {formatTime(time)}</div>
        {gameStarted && (
          <div className="next-number">Find Number: {nextNumber}</div>
        )}
      </div>

      <div className="lives">
        Lives: {Array(3 - wrongClicks).fill('❤️').join('')}
        {Array(wrongClicks).fill('🖤').join('')}
      </div>

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

      <div className="stats">
        <button 
          className="history-button"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
        {showHistory && history.length > 0 && (
          <div className="history-list">
            <h3>Leaderboard:</h3>
            {history.map((game, index) => (
              <div key={index} className="history-item">
                {game.playerName} - Points: {game.points} - Time: {formatTime(game.time)}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-emoji">
              {modalInfo.type === 'success' ? '🎉' : '😢'}
            </div>
            
            <h2 className={modalInfo.type === 'success' ? 'success' : 'failure'}>
              {modalInfo.type === 'success' ? 'Congratulations!' : 'Game Over!'}
            </h2>
            
            <p>{modalInfo.message}</p>

            {modalInfo.type === 'success' && bestTime !== null && (
              <p className={time < bestTime ? 'new-record' : ''}>
                {time < bestTime ? '🏆 New Best Time!' : `Best Time: ${formatTime(bestTime)}`}
              </p>
            )}

            <div className="modal-buttons">
              <button
                className="play-again"
                onClick={() => {
                  setShowModal(false);
                  handleStartGame();
                }}
              >
                Play Again
              </button>
              <button
                className="close"
                onClick={() => {
                  setShowModal(false);
                  resetGame();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .header {
          background-color: #2c3e50;
          padding: 20px;
          border-radius: 10px;
          color: white;
          text-align: center;
          margin-bottom: 30px;
        }

        .controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s;
        }

        .start { background-color: #2ecc71; color: white; }
        .reset { background-color: #e74c3c; color: white; }
        .auto-play { background-color: #3498db; color: white; }
        .auto-play.active { background-color: #f39c12; }
        .disabled { background-color: #95a5a6; cursor: not-allowed; }

        input {
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 200px;
        }

        .game-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .lives {
          text-align: center;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight:
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
          min-width: 300px;
        }

        .modal-emoji {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .modal-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }

        .play-again { background-color: #2ecc71; color: white; }
        .close { background-color: #95a5a6; color: white; }

        .stats {
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .history-button {
          background-color: #34495e;
          color: white;
          width: 100%;
          margin: 10px 0;
        }

        .history-list {
          margin-top: 10px;
        }

        .history-item {
          background-color: white;
          padding: 10px;
          margin: 5px 0;
          border-radius: 4px;
        }

        .new-record {
          color: #e74c3c;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default App;