import React, { useState, useEffect } from 'react';
import Circle from '../components/Circle/Circle';
import '../components/Circle/Circle.css';
import './App.css';

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
    ].sort((a, b) => a.time - b.time)
    .slice(0, 5);
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
              onChange={handleInputChange}
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

          <button onClick={resetGame} className="reset">
            Reset Game
          </button>

          {gameStarted && (
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              disabled={!gameStarted}
              className={`auto-play ${autoPlay ? 'active' : ''}`}
            >
              {autoPlay ? 'Stop Auto Play' : 'Start Auto Play'}
            </button>
          )}
        </div>
      </div>

      <div className="game-info">
        <div className="timer">
          Time: {formatTime(time)}
        </div>

        {gameStarted && (
          <div className="next-number">
            Find Number: {nextNumber}
          </div>
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
                #{index + 1} {game.playerName} - Points: {game.points} - Time: {formatTime(game.time)}
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
    </div>
  );
}

export default App;