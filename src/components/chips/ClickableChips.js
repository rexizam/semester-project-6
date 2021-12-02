import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState, useEffect, useRef } from 'react';

const ClickableChips = ({genres}) => {
  const array = useRef([]);
  const [rerender, setRerender] = useState(false);

  const handleClick = (element) => {
    console.info(`You clicked the ${element.name} Chip.`);
    const elementIndex = array.current.findIndex((el) => el.id === element.id);

    if (elementIndex !== -1) {
      array.current.splice(elementIndex, 1);
    } else {
      array.current.push(element);
    }

    setRerender(!rerender);
    console.log(array.current);
  };

  useEffect(() => {
    console.log('FFFFFF');
  }, [rerender]);

  console.log('render');
  console.log(array.current);

  const movieGenres = genres.map((element, i) => (
    <Chip
      key={i}
      label={element.name}
      variant={
        array.current.find((el) => el.id === element.id) ? 'filled' : 'outlined'
      }
      color={'secondary'}
      onClick={() => handleClick(element)}
    />
  ));

  return (
    <Stack direction="row" spacing={1}>
      {movieGenres}
    </Stack>
  );
}

export default ClickableChips;