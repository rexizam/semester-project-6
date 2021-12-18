import { Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { getRealmService } from '../../realm-cli';

const FavouritesButton = ({ movieId, favourites }) => {

  const [filled, setFilled] = useState(false);
  const [color, setColor] = useState('#ddd');
  const realmService = getRealmService();

  const handleMouseEnter = () => {
    setColor(filled ? '#ddd' : '#FF4040');
  };

  const handleMouseLeave = () => {
    setColor(filled ? '#FF4040' : '#ddd');
  };

  const handleClick = async () => {
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
  }

  useEffect(() => {
    const isFavourite = favourites?.includes(movieId);
    setFilled(isFavourite);
    setColor(isFavourite ? '#FF4040' : '#ddd');
  }, [movieId, favourites])

  return (
    <Button.Ripple
      className={'w-100'}
      color='primary'
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
      onClick={() => handleClick()}
      outline
    >
      <svg
        viewBox='0 0 24 24'
        strokeLinecap='round'
        strokeLinejoin='round'
        width={24}
        height={24}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeWidth={2}
          stroke={color}
          fill={filled ? color : 'none'}
          d='M12 5.74C24.32-3.88 26.31 14.49 12 20-2.31 15.57-.32-3.88 12 5.74z'
        />
      </svg>
      <span className={'ml-1'}>{filled ? 'Added' : 'Add to favourites'}</span>
    </Button.Ripple>
  )
}

export default FavouritesButton