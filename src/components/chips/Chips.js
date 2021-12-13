import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from "lodash";

const Chips = ({ genres, toggledGenres, handleSearch }) => {

  const toggledChips = useRef(toggledGenres);

  const debounce = useCallback(
    _.debounce((_searchVal: string) => {
      handleSearch(_searchVal);
    }, 500),
    []
  );

  const handleClick = (element) => {
    const elementIndex = toggledChips.current.findIndex((el) => el.id === element.id);
    if (elementIndex !== -1) {
      toggledChips.current.splice(elementIndex, 1);
    } else {
      toggledChips.current.push(element);
    }
    debounce([...toggledChips.current]);
  };

  const movieGenres = genres?.map((genre, index) => (
    <Chip
      id={`chip-${index}`}
      key={index}
      label={genre.name}
      variant={
        toggledChips.current.find((el) => el.id === genre.id) ? 'filled' : 'outlined'
      }
      color={'secondary'}
      style={{ margin: 5 }}
      onClick={() => handleClick(genre)}
    />
  ));

  return (
    <Stack direction='row' spacing={1} flexWrap={'wrap'} justifyContent={'center'} marginBottom={3} marginTop={2}>
      {movieGenres}
    </Stack>
  );
};

Chips.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  setSearchGenres: PropTypes.func,
};

export default Chips;