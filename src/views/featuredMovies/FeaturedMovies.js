import Movies from '../../components/movie-card/Movies';
import { useState } from 'react';
import { Provider as GridProvider, Row } from 'griding';
import * as GridConfig from '../../configs/gridConfig';

const FeaturedMovies = () => {

  const [page, setPage] = useState(1);
  const pagesArray = [...Array(page).fill(0).map((x, i) => i + 1)];

  return (
    <GridProvider columns={GridConfig.columns} breakpoints={GridConfig.breakpoints}>
      <Row vertical-gutter style={{marginBottom: '2rem', justifyContent: 'space-around'}}>
        {pagesArray.map(page => (
          <Movies key={page} page={page} setPage={setPage} isLastPage={pagesArray.slice(-1)[0] === page} />
        ))}
      </Row>
    </GridProvider>
  );
};

export default FeaturedMovies;
