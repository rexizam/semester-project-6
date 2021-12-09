// React
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// 3rd party
import { Provider as GridProvider, Row } from 'griding'

// Own
import { getFavouriteMovieIds } from '../../redux/actions/favouriteMoviesIds';
import * as GridConfig from '../../configs/gridConfig';
import FavouriteMoviesCard from './FavouriteMoviesCard';

const FavouriteMovies = () => {

  /*
    Use the store to retrieve the favourite movies' ids through the selector.
   */
  const dispatch = useDispatch();
  const favouritesStore = useSelector(state => state.favouriteMovieIdsReducer.favouriteMovieIds);
  useEffect(() => {
    dispatch(getFavouriteMovieIds());
  }, []);

  return (
    <GridProvider columns={GridConfig.columns} breakpoints={GridConfig.breakpoints}>
      <Row vertical-gutter style={{ marginBottom: '2rem', justifyContent: 'space-around' }}>
        {favouritesStore.favouriteMovieIds?.map((favouriteMovieId, index) => <FavouriteMoviesCard key={index} favouriteMovieId={favouriteMovieId} />)}
      </Row>
    </GridProvider>
  );
};

export default FavouriteMovies;