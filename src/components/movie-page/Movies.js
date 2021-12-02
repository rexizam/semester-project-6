import MovieRow from './MovieRow';
import { useState } from 'react';
import { Provider as GridProvider, Row } from 'griding';
import * as GridConfig from '../../configs/gridConfig';
import SearchTab from '../search/SearchTab';

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
  const [searchString, setSearchString] = useState('Star Wars');
  /**
   * Page state hook:
   * -  page is the value, initially set to 1.
   * -  setPage, setter for the value of the page.
   */
  const [page, setPage] = useState(1);
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
  const isRequestTypeSearch = () => requestType === 'search';

  console.log(searchString);
  return <>
    <GridProvider columns={GridConfig.columns} breakpoints={GridConfig.breakpoints}>
      {isRequestTypeSearch() && <SearchTab searchString={searchString} setSearchString={setSearchString} />}
      <Row vertical-gutter style={{ marginBottom: '2rem', justifyContent: 'space-around' }}>
        {
          pagesArray.map(page => (isRequestTypeSearch() ? (<MovieRow key={page} requestType={requestType} searchString={searchString} page={page} setPage={setPage} isLastPage={isLastPage(pagesArray, page)} />) : (<MovieRow key={page} requestType={requestType} page={page} setPage={setPage} isLastPage={isLastPage(pagesArray, page)} />)))
        }
      </Row>
    </GridProvider>
  </>;
};

export default Movies;
