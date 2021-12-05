import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState, useRef } from 'react';

/**
 * Clickable Chips component. Used to keep track of which movie genres are selected by the user.
 * @param genres List of all movie genres available from the TMDb API.
 * @param setSearchGenres Setter state hook for the searchGenres used to build the query for the request
 *                        that will be sent to the TMDb API for the specified genres.
 * @returns {JSX.Element}
 * @constructor
 */
const Chips = ({ genres, setSearchGenres }) => {
  /**
   * Array used to keep track of which chips are toggled (clicked).
   * Uses the useRef hook for single value consistency across re-renders of the
   * component.
   * @type {React.MutableRefObject<*[]>}
   */
  const toggledChips = useRef([]);
  const [rerender, setRerender] = useState(false);

  const handleClick = (element) => {
    const elementIndex = toggledChips.current.findIndex((el) => el.id === element.id);
    if (elementIndex !== -1) {
      toggledChips.current.splice(elementIndex, 1);
    } else {
      toggledChips.current.push(element);
    }

    setRerender(!rerender);
    setSearchGenres([...toggledChips.current]);
  };

  const movieGenres = genres?.map((element, index) => (
    <Chip
      key={index}
      label={element.name}
      variant={
        toggledChips.current.find((el) => el.id === element.id) ? 'filled' : 'outlined'
      }
      color={'secondary'}
      style={{ margin: 5 }}
      onClick={() => handleClick(element)}
    />
  ));

  return (
    <Stack direction='row' spacing={1} flexWrap={'wrap'} justifyContent={'center'}>
      {movieGenres}
    </Stack>
  );
};

export default Chips;