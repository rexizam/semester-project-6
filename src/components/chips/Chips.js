import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState, useEffect, useRef } from 'react';

export default function ClickableChips() {
  const array = useRef([]);
  const [rerender, setRerender] = useState(false);
  const movieGenres = [
    {
      id: 228,
      name: 'Action',
    },
    {
      id: 331,
      name: 'Comedy',
    },
    {
      id: 116,
      name: 'Drama',
    },
    {
      id: 975,
      name: 'Thriller',
    },
  ];

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

  const genres = movieGenres.map((element, i) => (
    <Chip
      key={i}
      label={element.name}
      variant={
        array.current.find((el) => el.id === element.id) ? 'filled' : 'outlined'
      }
      onClick={() => handleClick(element)}
    />
  ));

  return (
    <Stack direction="row" spacing={1}>
      {genres}
    </Stack>
  );
}