import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useRef, useCallback } from 'react';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import _ from "lodash";

const customTheme = createTheme({
  palette: {
    primary: {
      light: '#6959ce',
      main: '#6959ce',
      dark: '#6959ce',
      contrastText: '#6959ce',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        outlined: {
          color: '#6959ce',
          '&:hover': {
            background: `${'#6959ce'} !important`,
            color: '#fff',
          },
        },
        filled: {
          color: '#fff',
          '&:hover': {
            background: `${'rgba(105,89,206,0.56)'} !important`,
            color: '#fff',
          },
        },
      },
    },
  }
});

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
      color={'primary'}
      style={{ margin: 5 }}
      onClick={() => handleClick(genre)}
    />
  ));

  return (
    <ThemeProvider theme={customTheme}>
      <Stack direction='row' spacing={1} flexWrap={'wrap'} justifyContent={'center'} marginBottom={3} marginTop={2}>
        {movieGenres}
      </Stack>
    </ThemeProvider>
  );
};

Chips.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  setSearchGenres: PropTypes.func,
};

export default Chips;