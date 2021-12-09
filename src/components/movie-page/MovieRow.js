// React
import { Fragment, useEffect, useRef } from 'react';

// 3rd party
import { useFetch } from 'react-hooks-async';
import { useInView } from 'react-intersection-observer';
import handleViewport from 'react-in-viewport';
import { Cell } from 'griding';

// Own
import '../movie-card/movies.scss';
import MovieCard from '../movie-card/MovieCard';
import { api, base, responseConfigParameter } from '../../network/Constants';

/**
 * Function to build the request URL (for the TMDb API).
 * @param page Data response page.
 * @param requestType The type of the request, one of ['featured', 'popular', 'search'], each is component-specific.
 * @param searchString In the case of the 'search' request, this is the API query parameter (movie name to search).
 * @param searchGenres Array of genres to be added to the TMDb request query. A genre is added to the searchGenres array by
 *                    being clicked on (on the respective chip label, i.e. "Drama") in the "SearchMovies" component/view.
 * @returns {string[]} Array of strings containing the request information.
 */
const buildURL = (page, requestType, searchString, searchGenres) => {
  const pageParameter = `&page=${page}`;
  switch (requestType) {
    case 'featured': {
      return ([`${base}/discover/movie?sort_by=vote_average.desc`, `&api_key=${api}`, responseConfigParameter, pageParameter]);
    }
    case 'popular': {
      return ([`${base}/discover/movie?sort_by=popularity.desc`, `&api_key=${api}`, responseConfigParameter, pageParameter]);
    }
    case 'search': {
      if (searchGenres && searchGenres.length >= 1) {
        const genresSearchString = (searchGenres.map(searchGenre => searchGenre.id)).join(',');
        return ([`${base}/discover/movie`, `?api_key=${api}&with_genres=${genresSearchString}`, responseConfigParameter, pageParameter]);
      }
      if (searchString !== ' ') return ([`${base}/search/movie?query=${searchString}`, `&api_key=${api}`, responseConfigParameter, pageParameter]);
    }
  }
};

/**
 *
 * @param page Current page number.
 * @param setPage State mutator hook to continuously increment the page number.
 * @returns {null} Does not need to return anything.
 * @constructor
 */
const InfiniteScroll = ({ page, setPage }) => {
  useEffect(() => setPage(page + 1));
  return null;
};

/**
 * Movie row component, used for creating rows that contain movies for the Movies component.
 * @param page Page number for the movies (determined by the number of the movies).
 * @param setPage State hook, used to set page number on the child component (MovieCardBlock)
 * @param isLastPage Boolean flag, used to determine if the current page is the last page
 * @param requestType The type of request that the component scopes to, one of ['featured', 'popular', 'search']
 * @param searchString In the case of the requestType being 'search', the movie name (string) to search for.
 * @param searchGenres In the case of the requestType being 'search', the movie genres (array of objects) to search for.
 * @param favouriteMovieIds List of ids of the movies that a user has as favourites.
 */
const MovieRow = ({ requestType, searchString, searchGenres, page, setPage, isLastPage, favouriteMovieIds }) => {
  const { pending, error, result, abort } = useFetch(buildURL(page, requestType, searchString, searchGenres).join(''));
  const [ref, inView] = useInView();
  const aborted = useRef(false);
  const totalPages = result?.total_pages;
  const MovieCardBlock = handleViewport(MovieCard);

  const checkIsFavourite = (id) => {
    if (favouriteMovieIds && favouriteMovieIds.length >= 1) {
      return favouriteMovieIds.includes(id);
    }
  };

  if (requestType === 'search' && searchString === '' && searchGenres.length === 0) {
    abort();
    aborted.current = true;
  }

  if (error) return (
    <Cell xs={12}>
      <div>Error: {error.name} {error.message}</div>
    </Cell>
  );

  if (pending) return (Array(aborted.current ? 0 : 20).fill(0).map((x, i) => (
    <Cell key={i} xs={6} sm={4} md={3} xg={2}>
      <MovieCard loading />
    </Cell>
  )));

  if (result.results && !result?.results?.length) return (
    <Cell xs={12}>
      <div>No results found</div>
    </Cell>
  );

  if (!result?.results?.length) return null;

  return (
    <Fragment>
      {result?.results?.map(entry => (
        <Cell key={entry.id} xs={6} sm={4} md={3} xg={2}>
          <MovieCardBlock {...entry} isFavourite={checkIsFavourite(entry.id)} favourites={favouriteMovieIds} />
        </Cell>
      ))}
      {isLastPage && totalPages && totalPages > page && (
        <Cell xs={6} sm={4} md={3} xg={2}>
          <MovieCardBlock page={page} setPage={setPage} loadMore />
          {page > 1 && <div ref={ref}>{inView && <InfiniteScroll page={page} setPage={setPage} />}</div>}
        </Cell>
      )}
    </Fragment>
  );
};

export default MovieRow;