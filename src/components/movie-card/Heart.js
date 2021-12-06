import React, { useState } from 'react';
import { getRealmService } from '../../realm-cli';

const Heart = ({
                 size = 24,
                 filled = false,
                 strokeWidth = '2',
                 movieId,
               }) => {

  let favouriteMovies = [];
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

  const updateCollection = async (isUpdate) => {
    await collection.findOneAndReplace(
      {
        userID: realmService.currentUser.id,
      }, {
        userID: realmService.currentUser.id,
        userName: realmService.currentUser.customData.userName,
        favourites: isUpdate ? favouriteMovies : [movieId],
      },
    );
  };

  const createOrUpdateFavouriteMoviesList = async () => {
    favouriteMovies = await (await collection.find({ userID: realmService.currentUser.id }))[0].favourites;
    if (!favouriteMovies) {
      await updateCollection(false);
    } else if (!favouriteMovies.includes(movieId)) {
      favouriteMovies.push(movieId);
      await updateCollection(true);
    }
  };

  const handleClick = () => {
    createOrUpdateFavouriteMoviesList();
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
