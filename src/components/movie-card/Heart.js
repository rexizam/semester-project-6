// React
import React, { useState } from 'react';

// Own
import { getRealmService } from '../../realm-cli';

const Heart = ({ size = 24, filled, setFilled, strokeWidth = '2', movieId }) => {
  const [color, setColor] = useState('#ddd');
  const realmService = getRealmService();

  const handleMouseEnter = () => {
    setColor('#FF4040');
  };

  const handleMouseLeave = () => {
    setColor('#ddd');
  };

  const updateFavouriteMovies = async () => {
    const favourites = await realmService.currentUser.functions.callFunction('getFavouriteMovies');
    if (favourites === null) {
      await realmService.currentUser.functions.callFunction('addOrRemoveFavourites', [movieId]).then(setFilled(!filled));
    } else {
      const updated = favourites;
      if (!updated.includes(movieId)) {
        updated.push(movieId);
        await realmService.currentUser.functions.callFunction('addOrRemoveFavourites', updated).then(setFilled(!filled));
      } else if (updated.includes(movieId)) {
        const filteredFavourites = updated.filter(item => item !== movieId);
        await realmService.currentUser.functions.callFunction('addOrRemoveFavourites', filteredFavourites).then(setFilled(!filled));
      }
    }
  };

  const handleClick = () => {
    updateFavouriteMovies();
  };

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
  );
};

export default Heart;