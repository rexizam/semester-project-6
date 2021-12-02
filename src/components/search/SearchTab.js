import SearchBar from 'material-ui-search-bar';

import React from 'react';
import './search-tab.scss';

/**
 * Search tab component, has an input field which receives some text from the user and sets its value in
 * the searchString through the setSearchString state function.
 * The initial value is "Star Wars", set in the parent component, "Movies.js".
 * @param searchString Component property, the initial value is "Star Wars", upon changed (in the UI),
 *                     the value is changed to newSearchString.
 * @param setSearchString State setter, sets the state of the component and sends it to the parent, "Movies.js".
 * @returns {JSX.Element}
 * @constructor
 */
const SearchTab = ({searchString, setSearchString}) => {
  const searchBarTitle = 'Enter a movie name below';
  return (
    <>
      <h3 className={'search-tab-title'}>{searchBarTitle}</h3>
      <SearchBar
        className={'search-tab'}
        value={searchString}
        onChange={(newSearchString) => setSearchString(newSearchString)}
      />
    </>
  );
};

export default SearchTab;