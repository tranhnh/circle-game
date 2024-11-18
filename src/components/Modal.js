import React from 'react';

function Modal({ setTime, setNextNumber, setWrongClicks, showModal, modalInfo, formatTime, bestTime, time, setShowModal, handleStartGame, resetGame }) {
  return showModal ? (
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
              setTime(0);
              setNextNumber(1);
              setWrongClicks(0);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Modal;
