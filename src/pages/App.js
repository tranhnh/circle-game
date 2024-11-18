import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Controls from '../components/Controls';
import GameInfo from '../components/GameInfo';
import Lives from '../components/Lives';
import CircleContainer from '../components/CircleContainer';
import Modal from '../components/Modal';
import Stats from '../components/Stats';

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
  const [isPaused, setIsPaused] = useState(false);
  

  useEffect(() => {
    let timer;
    if (gameStarted && !isPaused) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, isPaused]);

  useEffect(() => {
     if (!autoPlay || isPaused || !gameStarted) return;

    const nextCircle = circles.find(circle => circle.id === nextNumber);
    if (nextCircle) {
      const timeout = setTimeout(() => {
        const circleElement = document.querySelector(`[data-circle-id="${nextCircle.id}"]`);
        if (circleElement) {
          circleElement.click();
        }
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [autoPlay, nextNumber, circles, gameStarted, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };



  const resetGame = () => {
    setTime(0);
    setNextNumber(1);
    setWrongClicks(0);

    const newCircles = Array.from({ length: points }, (_, i) => ({
    id: i + 1,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    isHidden: false,
  }));

  setCircles(newCircles);
  setGameStarted(true);
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
    if (!gameStarted || isPaused) return;

    if (id === nextNumber) {
      setNextNumber(prev => prev + 1);
      setCircles(prevCircles =>
        prevCircles.map(circle =>
          circle.id === id ? { ...circle, isHidden: true } : circle
        )
      );

      if (id === points) {
        setTimeout(() => {
          handleGameWin(); 
        }, 800); 
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

  const togglePause = () => {
    setIsPaused((prev) => {
      if (!prev) {
        setAutoPlay(false);
      }
      return !prev;
    });
  };

  const handleStopGame = () => {
    setGameStarted(false);
    setTime(0);
    setNextNumber(1); 
    setWrongClicks(0);
    setCircles([]); 
    setAutoPlay(false);
    setShowModal(false); 
    setIsPaused(false);
  };

  return (
    <div className="container">
    
      <Header />

      <Controls
        playerName={playerName}
        setPlayerName={setPlayerName}
        points={points}
        setPoints={setPoints}
        handleStartGame={handleStartGame}
        resetGame={resetGame}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        gameStarted={gameStarted}
        togglePause={togglePause}
        isPaused={isPaused} 
        handleStopGame={handleStopGame}
      />

      <GameInfo
        gameStarted={gameStarted}
        time={time}
        formatTime={formatTime}
        nextNumber={nextNumber}
      />

      <Lives wrongClicks={wrongClicks} />

      <CircleContainer
        gameStarted={gameStarted}
        circles={circles}
        handleCircleClick={handleCircleClick}
        nextNumber={nextNumber}
        points={points}
      />

      <Stats
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        history={history}
        formatTime={formatTime}
      />

      <Modal
        showModal={showModal}
        setShowModal={setShowModal} 
        setTime={setTime}
        setNextNumber={setNextNumber}
        setWrongClicks={setWrongClicks}
        time={time}
        bestTime={bestTime}
        formatTime={formatTime}
        modalInfo={modalInfo}
        handleStartGame={handleStartGame}
        resetGame={resetGame}
      />

    </div>
  );
}

export default App;