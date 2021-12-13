import './movieRating.scss';

const MovieRating = ({ rating }) => {
  return (
    <div className='tmdb__rating'>
      <div className={'rating'}>{rating === 0 ? '-' : rating}</div>
      <div className={'tmdb'}>TMDb</div>
    </div>
  );
}

export default MovieRating;