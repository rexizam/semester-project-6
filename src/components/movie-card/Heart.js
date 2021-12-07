import React, { useState } from 'react';
import { getRealmService } from '../../realm-cli';

const Heart = ({
                 size = 24,
                 filled,
                 setFilled,
                 strokeWidth = '2',
                 movieId,
                 favourites,
               }) => {

  const [color, setColor] = useState('#ddd');

  const realmService = getRealmService();
  const mongodb = realmService.currentUser.mongoClient(process.env.REACT_APP_MONGO_CLIENT);
  const collection = mongodb.db(process.env.REACT_APP_MONGODB_DB_NAME).collection('user_profiles');

  const handleMouseEnter = () => {
    setColor('#FF4040');
  };

  const handleMouseLeave = () => {
    setColor('#ddd');
  };

  const refreshUserCustomData = async () => {
    await realmService.currentUser.refreshCustomData();
    console.log(realmService.currentUser.customData.favourites);

  };

  const updateCollection = async () => {
    const updated = favourites;
    if (!updated.includes(movieId)) {
      updated.push(movieId);
      await collection.findOneAndReplace(
        {
          userID: realmService.currentUser.id,
        }, {
          userID: realmService.currentUser.id,
          userName: realmService.currentUser.customData.userName,
          favourites: updated,
        },
      );
      refreshUserCustomData().then(setFilled(!filled));
    } else if (updated.includes(movieId)) {
      const filteredFavourites = updated.filter(item => item !== movieId);
      console.log(filteredFavourites);
      await collection.findOneAndReplace(
        {
          userID: realmService.currentUser.id,
        }, {
          userID: realmService.currentUser.id,
          userName: realmService.currentUser.customData.userName,
          favourites: filteredFavourites,
        },
      );
      refreshUserCustomData().then(setFilled(!filled));
    }
  };

  const handleClick = () => {
    updateCollection();
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
