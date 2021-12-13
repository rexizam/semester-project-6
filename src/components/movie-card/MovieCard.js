// React
import { useEffect, useState } from 'react';

// 3rd party
import { Film } from 'react-feather';
import ProgressiveImage from 'react-progressive-graceful-image';
import { Link } from 'react-router-dom';

// Own
import MovieInfo from './MovieInfo';
import Rating from './Rating';
import Heart from './Heart';
import '../movie-card/movies.scss';

const MovieCard = ({ movieData, isFavourite }) => {

  const [filled, setFilled] = useState(isFavourite);
  const id = movieData?.id;
  const title = movieData?.title;
  const description = movieData?.overview;
  const image = movieData?.poster_path;
  const year = movieData?.release_date?.split('-')[0];
  const score = movieData?.vote_average;

  const truncate = (str, n) => {
    if (str?.length > n) {
      let trimmedString = str.substr(0, n - 1);
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
      return trimmedString;
    } else {
      return str;
    }
  };

  useEffect(() => {
    setFilled(isFavourite);
  }, [isFavourite])

  return (
    <div className='movie'>
      <div className={'overlay'} />
      <Link to={`/movieDetails/${id}`} className={'hiddenLink'} />
      {image && (
        <ProgressiveImage
          src={`https://image.tmdb.org/t/p/w300/${image}`}
          placeholder={`https://image.tmdb.org/t/p/w45/${image}`}
        >
          {src => <img className={'img'} src={src} alt={''} />}
        </ProgressiveImage>
      )}
      {!image && (<Film className='img' />)}
      {title && (<h2 className='movie__title'>{truncate(title, 60)}</h2>)}
      {description && (<span className='movie__description'>{truncate(description, 160)}</span>)}
      <div className='movie__infos'>
        {year && (<MovieInfo name='year' value={year} />)}
      </div>
      <div className='movie__imdb'>
        <Rating rating={score?.toFixed(1)} />
        <Heart movieId={movieData?.id} filled={filled} setFilled={setFilled} />
      </div>
    </div>
  );
};

export default MovieCard;