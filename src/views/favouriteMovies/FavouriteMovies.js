// React
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Own
import { getFavouriteMovieIds } from '../../redux/actions/favouriteMoviesIds';
import FavouriteMoviesCard from './FavouriteMoviesCard';
import InfiniteMovieList from '../../components/infinite-movie-list/InfiniteMovieList';

const FavouriteMovies = () => {

  /**
    Use the store to retrieve the favourite movies' ids through the selector.
   **/
  const dispatch = useDispatch();
  const favouritesStore = useSelector(state => state.favouriteMovieIdsReducer.favouriteMovieIds);

  useEffect(() => {
    dispatch(getFavouriteMovieIds());
  }, []);

  return (
    <InfiniteMovieList items={favouritesStore.favouriteMovieIds}>
      {(movieId) => <FavouriteMoviesCard favouriteMovieId={movieId} isFavourite={favouritesStore?.favouriteMovieIds?.includes(movieId)} />}
    </InfiniteMovieList>
  );
};

export default FavouriteMovies;