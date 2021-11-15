const MovieInfo = ({name, value}) => {
  return (
    <div className={`movie__${name}`}>
      <span className='info__head'>
        {name.replace(/\b\w/g, l => l.toUpperCase())}
      </span>
      {value}
    </div>
  )
}

export default MovieInfo;