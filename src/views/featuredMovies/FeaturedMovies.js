import React, {useEffect} from 'react';
import Movies from '../../components/movie-page/Movies';
import {useDispatch, useSelector} from 'react-redux';
import {getGenres} from '../../../src/redux/actions/genres/index';


const FeaturedMovies = () => {
    const dispatch = useDispatch();
    // .genresReducer.genres.genres
    const store = useSelector(state => state);

    useEffect(() => {
        dispatch(
            getGenres()
        )
    }, [])

    return <Movies requestType={'featured'}/>;
}

export default FeaturedMovies;