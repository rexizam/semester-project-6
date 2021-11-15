import { useFetch } from 'react-hooks-async';
import { useInView } from 'react-intersection-observer';
import MovieCard from './MovieCard';
import { Fragment, useEffect } from 'react';
import handleViewport from 'react-in-viewport';
import { Cell } from 'griding';
import './movies.scss';

const buildURL = (page) => {
  const base = 'https://api.themoviedb.org/3';
  const api = process.env.REACT_APP_TMDB_KEY;
  return ([`${base}/discover/movie`, `?api_key=${api}`, `&append_to_response=release_dates,external_ids,credits,content_ratings`, `&page=${page}`]);
};

const InfiniteScroll = ({ page, setPage }) => {
  useEffect(() => setPage(page + 1));
  return null;
};

const Movies = ({ page, setPage, isLastPage }) => {

  const { pending, error, result, abort } = useFetch(buildURL(page).join(''));
  const [ref, inView] = useInView();
  const totalPages = result?.total_pages;

  const MovieCardBlock = handleViewport(MovieCard);

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

export default Movies;