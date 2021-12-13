// React
import React, { useEffect, useState } from 'react';

import axios from 'axios';

// Own
import { api, base } from '../../network/Constants';
import MovieCard from '../../components/movie-card/MovieCard';
import '../../components/movie-card/movies.scss';

const FavouriteMoviesCard = ({ favouriteMovieId, isFavourite }) => {

  const [favouriteMovie, setFavouriteMovie] = useState({});

  const getMovie = async (favouriteMovieId) => {
    return await axios.get(`${base}/movie/${favouriteMovieId}?api_key=${api}`);
  };

  useEffect(() => {
    getMovie(favouriteMovieId).then((response) => { setFavouriteMovie(response.data) });
  }, []);

  return (<MovieCard movieData={favouriteMovie} isFavourite={isFavourite} />);
};

export default FavouriteMoviesCard;