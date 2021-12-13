// React
import React from 'react';

// Own
import './SearchResults.scss';

const SearchResults = ({ results, searchString, setSearchString, setActorDetails }) => {
  const isExactResult = results.filter(result => result.name === searchString).length === 1;
  const areTwoResults = results.length === 2;

  const onClickHandle = (event) => {
    const actorName = event.target.innerText;
    if (actorName.includes(' ')) {
      setSearchString(actorName);
      setActorDetails(...results.filter(result => result.name === actorName));
    }
  };

  return (
    (results.length >= 1 && searchString !== '') && (
      <div style={{ overflowY: (isExactResult || areTwoResults ? 'hidden' : 'scroll'), height: (isExactResult ? '50px' : areTwoResults ? '100px' : '130px'), margin: '10px', border: (isExactResult ? 'none' : '3px solid #404656'), borderRadius: '10px' }} className={'scroll-bar'}>
        {results && results.length >= 1 && results.map(result => (
          <div key={result.id} className={'search-result-item'} onClick={event => onClickHandle(event)}>{result.name}</div>))}
      </div>
    )
  );
};

export default SearchResults;