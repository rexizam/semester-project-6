const Rating = ({ rating }) => {
  return (
    <div className='movie__rating'>
      <div className={'rating'}>{rating === 0 ? '-' : rating}</div>
      <div className={'imdb'}>IMDb</div>
    </div>
  );
};

export default Rating;