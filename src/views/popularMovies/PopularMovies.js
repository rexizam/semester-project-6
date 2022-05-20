import { useInfiniteQuery } from 'react-query';
import { api, base } from '../../network/Constants';
import InfiniteMovieList from '../../components/infinite-movie-list/InfiniteMovieList';
import MovieCard from '../../components/movie-card/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFavouriteMovieIds } from '../../redux/actions/favouriteMoviesIds';
import { throwCommonError } from '../../utility/Utils';

const PopularMovies = () => {

  /**
   * The useDispatch hook is used to trigger the dispatcher and fetch the movie genres and favourite movies ids.
   * Extract the genres and favourite movie ids values from the state store through the genresReducer and favouriteMovieIdsReducer.
   * Note: Do not remove the empty dependencies' array, this will cause the useEffect to trigger
   *       continuously.
   */
  const dispatch = useDispatch();
  const favouritesStore = useSelector(state => state.favouriteMovieIdsReducer.favouriteMovieIds);
  const [favourites, updateFavourites] = useState(0);

  useEffect(() => {
    dispatch(getFavouriteMovieIds());
  }, [favourites]);

  const getPopularMovies = async (pageParam) => {
    const pageParameter = `&page=${pageParam}`;
    const url = ([`${base}/discover/movie?sort_by=vote_count.desc`, `&api_key=${api}`, pageParameter]).join('');
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throwCommonError(data);
    }

    return data;
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['popularMovies'],
    ({ pageParam = 1 }) => getPopularMovies(pageParam),
    {
      getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : false),
    }
  );

  const movies = data?.pages.reduce((result, page) => result.concat(page.results), []);

  return (
    <InfiniteMovieList
      items={movies}
      hasMore={hasNextPage}
      isFetching={isFetchingNextPage}
      fetchItems={fetchNextPage}
    >
      {(movie) => <MovieCard movieData={movie} isFavourite={favouritesStore?.favouriteMovieIds?.includes(movie.id)} updateFavourites={updateFavourites} />}
    </InfiniteMovieList>
  );
}

export default PopularMovies