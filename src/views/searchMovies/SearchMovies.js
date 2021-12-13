import { useInfiniteQuery } from 'react-query';
import { api, base } from '../../network/Constants';
import InfiniteMovieList from '../../components/infinite-movie-list/InfiniteMovieList';
import MovieCard from '../../components/movie-card/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFavouriteMovieIds } from '../../redux/actions/favouriteMoviesIds';
import { getGenres } from '../../redux/actions/genres';
import Searchbar from '../../components/search-bar/Searchbar';
import Chips from '../../components/chips/Chips';
import { throwCommonError } from '../../utility/Utils';
import ToggleSwitchButton from '../../components/toggle-button/toggleSwitchButton';

const SearchMovies = () => {

  const [searchString, setSearchString] = useState(localStorage.getItem('searchString') || '');
  const [searchGenres, setSearchGenres] = useState(JSON.parse(localStorage.getItem('searchGenres')) || []);
  const [rSelected, setRSelected] = useState(localStorage.getItem('searchType') || 'movieName');

  const dispatch = useDispatch();
  const genresStore = useSelector(state => state.genresReducer.genres);
  const favouritesStore = useSelector(state => state.favouriteMovieIdsReducer.favouriteMovieIds);

  useEffect(() => {
    dispatch(getGenres());
  }, [])

  useEffect(() => {
    if (rSelected === 'movieName') {
      setSearchGenres([]);
    }
    if (rSelected === 'movieGenre') {
      setSearchString('');
    }
    localStorage.setItem('searchType', rSelected);
  }, [rSelected])

  useEffect(() => {
    dispatch(getFavouriteMovieIds());
    localStorage.setItem('searchString', searchString.trim());
    localStorage.setItem('searchGenres', JSON.stringify((searchGenres)));
  }, [searchString, searchGenres]);

  const handleSearchStringQuery = (parameters) => {
    setSearchString(parameters);
  }

  const handleSearchGenresQuery = (parameters) => {
    setSearchGenres(parameters);
  }

  const buildSearchQuery = (page) => {
    const pageParameter = `&page=${page}`;
    if (searchGenres.length !== 0) {
      const genresSearchString = (searchGenres.map(searchGenre => searchGenre.id)).join(',');
      return ([`${base}/discover/movie`, `?api_key=${api}&with_genres=${genresSearchString}`, pageParameter]).join('');
    }
    if (searchString !== '') return ([`${base}/search/movie?query=${searchString}`, `&api_key=${api}`, pageParameter]).join('');
  }

  const getMovieSearchResults = async (pageParam) => {
    const response = await fetch(buildSearchQuery(pageParam));
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
    ['searchMovies', searchString, searchGenres],
    ({ pageParam = 1 }) => getMovieSearchResults(pageParam),
    {
      getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : false), enabled: searchString !== '' || searchGenres.length !== 0
    }
  );

  const movies = data?.pages.reduce((result, page) => result.concat(page.results), []);

  return (
    <>
      <ToggleSwitchButton rSelected={rSelected} setRSelected={setRSelected}/>
      {rSelected === 'movieName' && (<Searchbar handleSearch={handleSearchStringQuery} searchString={searchString} />)}
      {rSelected === 'movieGenre' && (
        <Chips genres={genresStore.genres} handleSearch={handleSearchGenresQuery} toggledGenres={searchGenres} />
      )}
      <InfiniteMovieList
        items={movies}
        hasMore={hasNextPage}
        isFetching={isFetchingNextPage}
        fetchItems={fetchNextPage}
      >
        {(movie) => <MovieCard movieData={movie} isFavourite={favouritesStore?.favouriteMovieIds?.includes(movie.id)} />}
      </InfiniteMovieList>
    </>
  );
}

export default SearchMovies