// import React, { useState, useEffect } from 'react';
// import Circle from './Circle';

// function App() {
//   const [points, setPoints] = useState(0);
//   const [circles, setCircles] = useState([]);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [nextNumber, setNextNumber] = useState(1);
//   const [time, setTime] = useState(0);
//   const [bestTime, setBestTime] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [showHistory, setShowHistory] = useState(false);
//   const [autoPlay, setAutoPlay] = useState(false);
//   const [wrongClicks, setWrongClicks] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [modalInfo, setModalInfo] = useState({ type: '', message: '' });


//   // Timer effect - count up
//   useEffect(() => {
//     let timer;
//     if (gameStarted) {
//       timer = setInterval(() => {
//         setTime((prev) => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);

    
//   }, [gameStarted]);

//   const handleInputChange = (e) => {
//     const value = parseInt(e.target.value, 10) || 0;
//     setPoints(value);
//     resetGame();
//   };

//   const resetGame = () => {
//     setGameStarted(false);
//     setTime(0);
//     setNextNumber(1);
//     setCircles([]);
//     setWrongClicks(0); // Đặt lại số lần click sai
//   };

//   const handleStartGame = () => {
//     const newCircles = Array.from({ length: points }, (_, i) => ({
//       id: i + 1,
//       x: Math.random() * 80 + 10,
//       y: Math.random() * 80 + 10,
//     }));
//     setCircles(newCircles);
//     setGameStarted(true);
//     setNextNumber(1);
//     setTime(0);
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleGameWin = () => {
//     setGameStarted(false);
//     const newHistory = [...history, { points, time }].slice(-5);
//     setHistory(newHistory);
    
//     if (bestTime === null || time < bestTime) {
//       setBestTime(time);
//     }
    
//     setModalInfo({
//       type: 'success',
//       message: `You completed ${points} points in ${formatTime(time)}!`
//     });
//     setShowModal(true);
//   };
  

//   const handleCircleClick = (id) => {
//     if (!gameStarted) return;

//     if (id === nextNumber) {   
//       setNextNumber((prev) => prev + 1);
//       setCircles((prev) => prev.filter((circle) => circle.id !== id));
      
//       if (id === points) {
//         handleGameWin();
//       }
//     } else {
//       // Wrong click feedback
//       // Visual feedback - shake effect
//       setWrongClicks((prev) => prev + 1); // Tăng số lần click sai
//       const circles = document.querySelectorAll('.circle');
//       circles.forEach(circle => {
//         circle.style.animation = 'shake 0.1s';
//         setTimeout(() => circle.style.animation = '', 500);
//       });
//     }
//     if (wrongClicks + 1 >= 3) {
//       setGameStarted(false);
//       setModalInfo({
//         type: 'failure',
//         message: 'You clicked wrong 3 times!'
//       });
//       setShowModal(true);
//     }
//   };

//   const toggleAutoPlay = () => {
//     if (!gameStarted) return; // Chỉ cho phép Auto Play khi game đang chạy
  
//     if (autoPlay) {
//       setAutoPlay(false); // Tắt Auto Play
//     } else {
//       setAutoPlay(true); // Bật Auto Play
//     }
//   };
  
//   useEffect(() => {
//     if (!autoPlay) return; // Nếu Auto Play tắt, không làm gì
  
//     if (circles.length === 0) {
//       setAutoPlay(false); // Tắt Auto Play khi không còn vòng tròn
//       return;
//     }
  
//     const nextCircle = circles.find((circle) => circle.id === nextNumber);
//     if (nextCircle) {
//       const timeout = setTimeout(() => {
//         // Tìm DOM element của circle và trigger click event
//         const circleElement = document.querySelector(`[data-circle-id="${nextCircle.id}"]`);
//         if (circleElement) {
//           circleElement.click(); // Trigger click event thay vì gọi handleCircleClick trực tiếp
//         }
//       }, 200);

//       return () => clearTimeout(timeout); // Xóa timeout nếu Auto Play bị dừng hoặc state thay đổi
//     }
//   }, [autoPlay, nextNumber, circles]); // Theo dõi trạng thái Auto Play, số tiếp theo, và danh sách vòng tròn
  
  
  
  

//   // Inline styles
//   const styles = {
//     container: {
//       maxWidth: '800px',
//       margin: '0 auto',
//       padding: '20px',
//       textAlign: 'center',
//       fontFamily: 'Arial, sans-serif'
//     },
//     title: {
//       color: '#2c3e50',
//       marginBottom: '20px'
//     },
//     controls: {
//       marginBottom: '20px',
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '10px',
//       alignItems: 'center',
//       flexWrap: 'wrap'
//     },
//     input: {
//       padding: '8px',
//       marginRight: '10px',
//       width: '200px',
//       fontSize: '16px',
//       borderRadius: '4px',
//       border: '1px solid #ccc'
//     },
//     button: {
//       padding: '8px 16px',
//       backgroundColor: gameStarted ? '#95a5a6' : '#2ecc71',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: gameStarted ? 'not-allowed' : 'pointer',
//       fontSize: '16px',
//       transition: 'background-color 0.3s'
//     },
//     gameInfo: {
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '20px',
//       marginBottom: '20px',
//       fontSize: '18px'
//     },
//     timer: {
//       color: '#2c3e50',
//       fontWeight: 'bold'
//     },
//     nextNumber: {
//       color: '#2980b9',
//       fontWeight: 'bold'
//     },
//     stats: {
//       marginTop: '20px',
//       padding: '10px',
//       backgroundColor: '#f8f9fa',
//       borderRadius: '4px'
//     },
//     historyButton: {
//       padding: '8px 16px',
//       backgroundColor: '#34495e',
//       color: 'white',
//       border: 'none',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       marginTop: '10px'
//     },
//     historyList: {
//       marginTop: '10px',
//       padding: '10px',
//       backgroundColor: 'white',
//       borderRadius: '4px',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//     }
//   };

//   return (
    
//     <div style={styles.container}>
//       <div style={{
//       backgroundColor: '#2c3e50',
//       padding: '20px',
//       borderRadius: '10px',
//       color: 'white',
//       marginBottom: '30px',
//       boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//     }}>
//       <h1 style={{ margin: 0, fontSize: '32px' }}>Number Click Game</h1>
//       <div style={{ 
//         fontSize: '16px',
//         opacity: 0.8,
//         marginTop: '5px'
//       }}>
//         Click the numbers in order as fast as you can!
//       </div>
//     </div>
      
//       <div style={styles.controls}>
//         <input
//           type="number"
//           min="0"
//           value={points || ''}
//           placeholder="Enter points"
//           onChange={handleInputChange}
//           disabled={gameStarted}
//           style={styles.input}
//         />
//         <button
//           onClick={handleStartGame}
//           disabled={points <= 0 || gameStarted}
//           style={styles.button}
//         >
//           {gameStarted ? 'Game in Progress' : 'Start Game'}
//         </button>
//         <button
//           onClick={resetGame}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#e74c3c',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontSize: '16px'
//           }}
//         >
//         Reset Game
//         </button>
//         <button
//           onClick={toggleAutoPlay}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: autoPlay ? '#f39c12' : '#3498db',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             fontSize: '16px'
//           }}
//           disabled={!gameStarted} // Chỉ bật Auto Play khi game bắt đầu
//         >
//           {autoPlay ? 'Stop Auto Play' : 'Start Auto Play'}
//         </button>
//       </div>

//       <div style={styles.gameInfo}>
//         <div style={styles.timer}>Time: {formatTime(time)}</div>
//         {gameStarted && (
//           <div style={styles.nextNumber}>Find Number: {nextNumber}</div>
//         )}
//       </div>

//       <div style={{
//         color: wrongClicks >= 2 ? '#e74c3c' : '#2ecc71',
//         fontWeight: 'bold',
//         fontSize: '16px',
//         alignItems: 'center',
//         gap: '5px'
//       }}>
//         Lives: {Array(3 - wrongClicks).fill('❤️').map((heart, i) => (
//           <span key={i}>{heart}</span>
//         ))}
//         {Array(wrongClicks).fill('🖤').map((heart, i) => (
//           <span key={i}>{heart}</span>
//         ))}
//       </div>

//       <div className="circle-container">
//         {gameStarted &&
//           circles.map((circle) => (
//             <Circle
//               key={circle.id}
//               id={circle.id}
//               x={circle.x}
//               y={circle.y}
//               onClick={() => handleCircleClick(circle.id)}
//               nextNumber={nextNumber}
//               totalCircles={points} // Truyền tổng số vòng tròn để tính zIndex
//             />
//           ))}
//       </div>

//       <div style={styles.stats}>
//         {bestTime !== null && (
//           <div>Best Time: {formatTime(bestTime)}</div>
//         )}
//         <button 
//           style={styles.historyButton}
//           onClick={() => setShowHistory(!showHistory)}
//         >
//           {showHistory ? 'Hide History' : 'Show History'}
//         </button>
//         {showHistory && history.length > 0 && (
//           <div style={styles.historyList}>
//             <h3>Last 5 Games:</h3>
//             {history.map((game, index) => (
//               <div key={index}>
//                 Game: {game.points} - Time: {formatTime(game.time)}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{
//             backgroundColor: 'white',
//             padding: '30px',
//             borderRadius: '8px',
//             textAlign: 'center',
//             minWidth: '300px',
//             boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//           }}>
//             <div style={{ fontSize: '40px', marginBottom: '20px' }}>
//               {modalInfo.type === 'success' ? '🎉' : '😢'}
//             </div>
            
//             <h2 style={{
//               margin: '0 0 10px 0',
//               color: modalInfo.type === 'success' ? '#2ecc71' : '#e74c3c'
//             }}>
//               {modalInfo.type === 'success' ? 'Congratulations!' : 'Game Over!'}
//             </h2>
            
//             <p style={{ marginBottom: '20px', color: '#666' }}>
//               {modalInfo.message}
//             </p>

//             <div style={{ 
//               marginBottom: '20px',
//               padding: '10px',
//               backgroundColor: '#f8f9fa',
//               borderRadius: '4px'
//             }}>
//               <p style={{ margin: '5px 0' }}>Time: {formatTime(time)}</p>
//               {modalInfo.type === 'success' && bestTime !== null && (
//                 <p style={{ margin: '5px 0', color: time < bestTime ? '#e74c3c' : '#666' }}>
//                   {time < bestTime ? '🏆 New Best Time!' : `Best Time: ${formatTime(bestTime)}`}
//                 </p>
//               )}
//             </div>

//             <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   handleStartGame(); // Start new game immediately
//                 }}
//                 style={{
//                   padding: '8px 20px',
//                   backgroundColor: '#2ecc71',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   fontSize: '16px'
//                 }}
//               >
//                 Play Again
//               </button>
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   resetGame();
//                 }}
//                 style={{
//                   padding: '8px 20px',
//                   backgroundColor: '#95a5a6',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '4px',
//                   cursor: 'pointer',
//                   fontSize: '16px'
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
  
//       <style>
//         {`
//           @keyframes shake {
//             0%, 100% { transform: translateX(0); }
//             25% { transform: translateX(-2px); }
//             75% { transform: translateX(2px); }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default App;

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
      setCircles(prev => prev.filter(circle => circle.id !== id));
      
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