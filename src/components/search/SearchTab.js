import SearchBar from 'material-ui-search-bar';

import React from 'react';
import './search-tab.scss';

const SearchTab = ({searchString, setSearchString}) => {
  const searchBarTitle = 'Enter a movie name below';
  return (
    <>
      <h3 className={'search-tab-title'}>{searchBarTitle}</h3>
      <SearchBar
        className={'search-tab'}
        value={searchString}
        onChange={(newValue) => setSearchString(newValue)}
      />
    </>
  );
};

export default SearchTab;