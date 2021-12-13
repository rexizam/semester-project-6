// React
import React, { useState } from 'react';

// 3rd party
import axios from 'axios';

// Own
import Searchbar from '../../components/search-bar/Searchbar';
import SearchResults from './SearchResults';
import { api, base } from '../../network/Constants';
import ActorDetails from './ActorDetails';

const SearchActors = () => {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState([]);
  const [actorDetails, setActorDetails] = useState({});

  if (searchString !== '') {
    axios.get(`${base}/search/person?api_key=${api}&query=${searchString}`).then(result => {
      setResults(result.data.results);
    });
  }

  const handleSearchStringQuery = (parameters) => {
    setSearchString(parameters);
  }

  return (
    <div>
      <Searchbar handleSearch={handleSearchStringQuery} searchString={searchString} />
      <SearchResults results={results} searchString={searchString} setSearchString={setSearchString} setActorDetails={setActorDetails} />
      {(searchString !== '' && actorDetails.id && searchString === actorDetails.name) && <ActorDetails actorDetails={actorDetails} />}
    </div>
  );
};

export default SearchActors;