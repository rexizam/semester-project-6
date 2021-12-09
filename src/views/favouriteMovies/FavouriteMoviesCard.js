// React
import React, { useEffect, useState } from 'react';

// 3rd party
import { Cell } from 'griding';
import axios from 'axios';
import handleViewport from 'react-in-viewport';

// Own
import { api, base } from '../../network/Constants';
import MovieCard from '../../components/movie-card/MovieCard';
import '../../components/movie-card/movies.scss';

const FavouriteMoviesCard = ({ favouriteMovieId }) => {
  const MovieCardBlock = handleViewport(MovieCard);
  const [favouriteMovie, setFavouriteMovie] = useState({});

  const getMovie = async (favouriteMovieId) => {
    return await axios.get(`${base}/movie/${favouriteMovieId}?api_key=${api}`);
  };

  useEffect(() => {
    getMovie(favouriteMovieId).then((response) => {
      setFavouriteMovie(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  return (
      <Cell key={favouriteMovie.id} xs={6} sm={4} md={3} xg={2}>
        <MovieCardBlock {...favouriteMovie} isFavourite={true} />
      </Cell>
  );
};

export default FavouriteMoviesCard;