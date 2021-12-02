import { useFetch } from 'react-hooks-async';
import { useInView } from 'react-intersection-observer';
import MovieCard from '../movie-card/MovieCard';
import { Fragment, useEffect } from 'react';
import handleViewport from 'react-in-viewport';
import { Cell } from 'griding';
import '../movie-card/movies.scss';

/**
 * Function to build the request URL (for the TMDb API).
 * @param page Data response page.
 * @param requestType The type of the request, one of ['featured', 'popular', 'search'], each is component-specific.
 * @param searchString In the case of the 'search' request, this is the API query parameter (movie name to search).
 * @returns {string[]} Array of strings containing the request information.
 */
const buildURL = (page, requestType, searchString) => {
  const base = 'https://api.themoviedb.org/3';
  const api = process.env.REACT_APP_TMDB_KEY;
  const responseConfigParameter = '&append_to_response=release_dates,external_ids,credits,content_ratings';
  const pageParameter = `&page=${page}`;

  switch (requestType) {
    case 'featured':
      return ([`${base}/discover/movie`, `?api_key=${api}`, responseConfigParameter, pageParameter]);
    case 'popular':
      return ([`${base}/movie/popular`, `?api_key=${api}`, responseConfigParameter, pageParameter]);
    case 'search':
      return ([`${base}/search/movie?query=${searchString}`, `&api_key=${api}`, responseConfigParameter, pageParameter]);
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
 * @param page page number for the movies (determined by the number of the movies).
 * @param setPage state hook, used to set page number on the child component (MovieCardBlock)
 * @param isLastPage boolean flag, used to determine if the current page is the last page
 * @param requestType
 * @param searchString
 * @returns {JSX.Element|unknown[]|null}
 * @constructor
 */
const MovieRow = ({ page, setPage, isLastPage, requestType, searchString }) => {
  const { pending, error, result, abort } = useFetch(buildURL(page, requestType, searchString).join(''));
  const [ref, inView] = useInView();
  const totalPages = result?.total_pages;

  const MovieCardBlock = handleViewport(MovieCard);

  if (error && requestType === 'search') return (
    <Cell xs={12}>
      <div/>
    </Cell>
  );

  if (error) return (
    <Cell xs={12}>
      <div>Error: {error.name} {error.message}</div>
    </Cell>
  );

  if (pending) return (Array(20).fill(0).map((x, i) => (
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
          <MovieCardBlock {...entry} />
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