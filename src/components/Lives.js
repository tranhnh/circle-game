import React from 'react';

function Lives({ wrongClicks }) {
  return (
    <div className="lives">
      Lives: {Array(3 - wrongClicks).fill('❤️').join('')}
      {Array(wrongClicks).fill('🖤').join('')}
    </div>
  );
}

export default Lives;
