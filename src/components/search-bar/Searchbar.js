import React from 'react';
import { Search, X } from 'react-feather';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

/**
 * Search bar component, has an input field which receives some text from the user and sets its value in
 * the searchString through the setSearchString state function.
 * The initial value is "Star Wars", set in the parent component, "Movies.js".
 * @param searchString Component property, the initial value is "Star Wars", upon changed (in the UI),
 *                     the value is changed to newSearchString.
 * @param setSearchString State setter, sets the state of the component and sends it to the parent, "Movies.js".
 * @returns {JSX.Element}
 * @constructor
 */
const Searchbar = ({ searchString, setSearchString }) => {
  return (
    <div className='d-flex align-content-center justify-content-between w-100'>
      <InputGroup className='input-group-merge'>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>
            <Search className='text-muted' size={14} />
          </InputGroupText>
        </InputGroupAddon>
        <Input placeholder='Search movie or select a category.' value={searchString} onChange={event => setSearchString(event.target.value)} />
        {searchString && (
          <InputGroupAddon addonType={'append'}>
            <InputGroupText>
              <X style={{ cursor: 'pointer' }} size={20} onClick={() => setSearchString('')} />
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
};

export default Searchbar;