import React, { useEffect } from 'react';
import Movies from '../../components/movie-page/Movies';

const FeaturedMovies = () => <Movies requestType={'featured'}/>;

export default FeaturedMovies;