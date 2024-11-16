// import React, { useState } from 'react';
// import './Circle.css';

// function Circle({ id, x, y, onClick, totalCircles, nextNumber, autoPlay }) {
//   const [isClicked, setIsClicked] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleClick = () => {
    
//     if (id === nextNumber) {
//       setIsClicked(true);
//       setIsAnimating(true);
      
//       setTimeout(() => {
//         onClick();
//         setIsAnimating(false);
//       }, 500); // Match this with your CSS transition time
//     } else {
//       onClick();
//     }
//   };

//   return (
//     <div
//       className={`circle ${isClicked ? 'fade-out' : ''}`}
//       data-circle-id={id}
//       style={{
//         left: `${x}%`,
//         top: `${y}%`,
//         zIndex: totalCircles - id,
//       }}
//       onClick={handleClick}
//     >
//       {id}
//     </div>
//   );
// }

// export default Circle;

import React, { useState } from 'react';
import './Circle.css';

function Circle({ id, x, y, onClick, totalCircles, nextNumber, autoPlay }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (id === nextNumber) {
      setIsClicked(true);
      setIsAnimating(true);
      
      setTimeout(() => {
        onClick();
        setIsAnimating(false);
      }, 500);
    } else {
      onClick();
    }
  };

  const circleClasses = [
    'circle',
    isClicked ? 'fade-out' : '',
    id === nextNumber ? 'next-number' : '',
    autoPlay ? 'no-click' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      data-circle-id={id}
      className={circleClasses}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: id === nextNumber ? totalCircles + 1 : totalCircles - id,
      }}
      onClick={handleClick}
    >
      {id}
    </div>
  );
}

export default Circle;