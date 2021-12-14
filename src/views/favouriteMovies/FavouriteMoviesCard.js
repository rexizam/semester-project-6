// React
import React from 'react';

// 3rd party
import { useQuery } from 'react-query';

// Own
import { api, base } from '../../network/Constants';
import MovieCard from '../../components/movie-card/MovieCard';
import '../../components/movie-card/movies.scss';
import { throwCommonError } from '../../utility/Utils';

const FavouriteMoviesCard = ({ favouriteMovieId, isFavourite }) => {

  const getMovie = async (movieId) => {
    const url = ([`${base}/movie/${movieId}?api_key=${api}`]).join('');
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throwCommonError(data);
    }

    return data;
  }

  const { data: favouriteMovie } = useQuery(['movieDetails', favouriteMovieId], () => getMovie(favouriteMovieId));

  return (<MovieCard movieData={favouriteMovie} isFavourite={isFavourite} />);
};

export default FavouriteMoviesCard;