import React, { useState } from 'react';

const Heart = ({
                 size = 24,
                 filled = false,
                 strokeWidth = '2',
               }) => {

  const [color, setColor] = useState('#ddd');

  const handleMouseEnter = () => {
    setColor('#FF4040');
  }

  const handleMouseLeave = () => {
    setColor('#ddd');
  }

  const handleClick = () => {
    console.log('mouse clicked');
  }

  return (
    <div onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()} onClick={() => handleClick()}>
      <svg
        viewBox='0 0 24 24'
        strokeLinecap='round'
        strokeLinejoin='round'
        width={size}
        height={size}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeWidth={strokeWidth}
          stroke={color}
          fill={filled ? color : 'none'}
          d='M12 5.74C24.32-3.88 26.31 14.49 12 20-2.31 15.57-.32-3.88 12 5.74z'
        />
      </svg>
    </div>
  )
}

export default Heart;
