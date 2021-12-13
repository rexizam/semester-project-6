import React, { useCallback, useState } from 'react';
import { Search, X } from 'react-feather';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import _ from "lodash";

const Searchbar = ({ handleSearch, searchString }) => {

  const [searchStringQuery, setSearchStringQuery] = useState(searchString);

  const debounce = useCallback(
    _.debounce((_searchVal: string) => {
      handleSearch(_searchVal);
    }, 500),
    []
  );

  const handleChange = (event) => {
    setSearchStringQuery(event);
    debounce(event);
  }

  return (
    <div className='d-flex align-content-center justify-content-between w-100 mb-3'>
      <InputGroup className='input-group-merge'>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>
            <Search className='text-muted' size={14} />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder='Search' value={searchStringQuery} onChange={event => handleChange(event.target.value)} />
        {searchStringQuery && (
          <InputGroupAddon addonType={'append'}>
            <InputGroupText>
              <X style={{ cursor: 'pointer' }} size={20} onClick={() => handleChange('')} />
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
};

export default Searchbar;