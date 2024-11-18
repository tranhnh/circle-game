import React from 'react';

function Lives({ wrongClicks }) {
  return (
    <div className="lives-container">
  <span>Lives:</span>
  <div className="lives-bar">
    <div
      className="lives-bar-inner"
      style={{ width: `${((3 - wrongClicks) / 3) * 100}%` }}
    ></div>
  </div>
</div>

  );
}

export default Lives;
