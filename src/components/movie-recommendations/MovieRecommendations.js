import { api, base } from '../../network/Constants';
import { useFetch } from 'react-hooks-async';
import { Cell, Provider as GridProvider, Row } from 'griding';
import * as GridConfig from '../../configs/gridConfig';
import React from 'react';
import MovieCard from '../movie-card/MovieCard';
import { CardHeader, CardTitle } from 'reactstrap';

const MovieRecommendations = ({ id, favourites }) => {

  const url = ([`${base}/movie/${id}/recommendations`, `?api_key=${api}`]).join('');
  const { pending, error, result, abort } = useFetch(url);

  return (
    <>
      {result?.results?.length > 0 && (
        <CardHeader>
          <CardTitle className={'font-large-1 text-center'} style={{textDecoration: 'underline'}}>Recommended Movies</CardTitle>
        </CardHeader>
      )}
      <GridProvider columns={GridConfig.columns} breakpoints={GridConfig.breakpoints}>
        <Row vertical-gutter style={{ marginBottom: '2rem', justifyContent: 'space-around' }}>
          {result?.results?.map(movie => (
            <Cell key={movie.id} xs={6} sm={4} md={3} xg={2}>
              <MovieCard movieData={movie} isFavourite={favourites?.includes(movie.id)} />
            </Cell>
          ))}
        </Row>
      </GridProvider>
    </>
  );
}

export default MovieRecommendations