import MovieInfo from './MovieInfo';
import Rating from './Rating';
import ProgressiveImage from 'react-progressive-graceful-image';
import Heart from './Heart';
import { ArrowDown } from 'react-feather';
import { getRealmService } from '../../realm-cli';

const MovieCard = ({ loading, loadMore, page, setPage, ...props }) => {
  const { inViewport, forwardedRef } = props;
  const title = props?.title || props?.name;
  const description = props?.overview || props?.biography;
  const image = props?.poster_path || props?.profile_path;
  const year = (props?.release_date || props?.first_air_date || props?.birthday)?.split('-')[0];
  const score = props?.vote_average;
  const imdb = props?.imdb_id || props?.external_ids?.imdb_id;

  const truncate = (str, n) => {
    if (str?.length > n) {
      let trimmedString = str.substr(0, n - 1);
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + "...";
      return trimmedString;
    } else {
      return str;
    }
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  return (
    <div ref={forwardedRef} className='movie'>

      <div className={'overlay'} />

      {image && inViewport && (
        <ProgressiveImage
          src={`https://image.tmdb.org/t/p/w300/${image}`}
          placeholder={`https://image.tmdb.org/t/p/w45/${image}`}
        >
          {src => <img className={'img'} src={src} alt={''} style={{ filter: loading ? 'blur(2rem)' : 'none' }} />}
        </ProgressiveImage>
      )}

      {loadMore && inViewport && (
        <button className={'movie-card-button'} onClick={() => handleClick()}>
          <div className={'loadMore'}>
            <div>Load more</div>
            <ArrowDown size={20} color={'#737373'} /></div>
        </button>
      )}

      {!loadMore && inViewport && (
        <>
          {title && (<h2 className='movie__title'>{truncate(title, 60)}</h2>)}
          {description && (<span className='movie__description'>{truncate(description, 160)}</span>)}
          <div className='movie__infos'>
            {year && (<MovieInfo name='year' value={year} />)}
          </div>

          <div className='movie__imdb'>
            <Rating rating={score} />
            <Heart movieId={props.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;