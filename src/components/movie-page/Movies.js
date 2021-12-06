// React
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Own
import MovieRow from './MovieRow';
import Chips from '../chips/Chips';
import Searchbar from '../search-bar/Searchbar';
import * as GridConfig from '../../configs/gridConfig';
import { getGenres } from '../../../src/redux/actions/genres/index';

// 3rd Party
import { Provider as GridProvider, Row } from 'griding';

/**
 * Container component for the movies to be displayed on a page.
 * @param requestType Parameter to determine which content should be requested from the TMDb API.
 * @returns {JSX.Element} The UI component.
 * @constructor Factory function of the component.
 */
const Movies = ({ requestType }) => {
  /**
   * SearchString state hook:
   * -  searchString is the value, initially it is an empty string, request string (used to search for a particular movie on the TMDb API).
   * -  setSearchString, setter for the value of searchString.
   */
  const [searchString, setSearchString] = useState('');
  /**
   * Page state hook:
   * -  page is the value, initially set to 1.
   * -  setPage, setter for the value of the page.
   */
  const [page, setPage] = useState(1);
  /**
   * SearchGenres state hook:
   * -  searchGenres is the value, initially set to an empty array and used in the "MovieRow" component.
   * -  setSearchGenres is the state setter, used in the "ClickableChips" component.
   */
  const [searchGenres, setSearchGenres] = useState([]);
  /**
   * Array of page indexes, starting at 1 (initial page). Then, as the user scrolls down,
   * it increases continuously.
   * @type {number[]}
   */
  const pagesArray = [...Array(page).fill(0).map((x, i) => i + 1)];
  /**
   * Function used to to determine if the current page is the last visible page (from pagesArray).
   * @param pagesArray Array of movie pages.
   * @param page Current page
   * @returns {boolean} True if the current page is the last visible page, false otherwise.
   */
  const isLastPage = (pagesArray, page) => pagesArray.slice(-1)[0] === page;
  /**
   * The useDispatch hook is used to trigger the dispatcher and fetch the movie genres.
   * Extract the genres values from the state store through the genresReducer.
   * Note: Do not remove the empty dependencies' array, this will cause the useEffect to trigger
   *       continuously.
   */
  const dispatch = useDispatch();
  const store = useSelector(state => state.genresReducer.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  return (
    <>
      {requestType === 'search' &&
      <>
        <Searchbar setSearchString={setSearchString} searchString={searchString} /><br />
        <div style={{ marginBottom: 30 }}><Chips genres={store.genres} setSearchGenres={setSearchGenres} /></div>
      </>
      }
      <GridProvider columns={GridConfig.columns} breakpoints={GridConfig.breakpoints}>
        <Row vertical-gutter style={{ marginBottom: '2rem', justifyContent: 'space-around' }}>
          {pagesArray.map(page => (
            <MovieRow key={page} requestType={requestType} searchString={searchString} searchGenres={searchGenres} page={page} setPage={setPage} isLastPage={isLastPage(pagesArray, page)} />
          ))}
        </Row>
      </GridProvider>
    </>
  );
};

export default Movies;
