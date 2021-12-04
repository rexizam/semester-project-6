import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState, useRef } from 'react';
import './chips.scss';

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
    console.log(toggledChips.current);
  };

  // useEffect(() => {
  //
  // }, [rerender]);

  console.log('render');
  console.log(toggledChips.current);

  const movieGenres = genres?.map((genre, index) => (
    <Chip
      className={'chip'}
      key={index}
      label={genre.name}
      variant={
        toggledChips.current.find((element) => element.id === genre.id) ? 'filled' : 'outlined'
      }
      color={'secondary'}
      onClick={() => handleClick(genre)}
    />
  ));

  return (
    <>
      <div className={'header'}>Available Categories:</div>
      <Stack direction='row' spacing={1} className={'stack-row'}>
        {movieGenres?.slice(0, 6)}
      </Stack>
      <Stack direction='row' spacing={1} className={'stack-row'}>
        {movieGenres?.slice(6, 12)}
      </Stack>
    </>
  );
};

export default Chips;