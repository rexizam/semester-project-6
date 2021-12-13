import { Card, CardBody, CardHeader, CardText, CardTitle, Row, Col, Badge, Button } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { api, base, responseConfigParameter } from '../../network/Constants';
import { useFetch } from 'react-hooks-async';
import Profiles from '../../components/movie-details/Profiles';
import { Fragment, useEffect } from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import MovieRating from '../../components/movie-details/MovieRating';
import { ArrowLeft, Film } from 'react-feather';
import MovieRecommendations from '../../components/movie-recommendations/MovieRecommendations';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteMovieIds } from '../../redux/actions/favouriteMoviesIds';
import FavouritesButton from '../../components/movie-details/FavouritesButton';
import StarRating from '../../components/star-rating/StarRating';
import { getRatedMovies } from '../../redux/actions/movieRatings';

const MovieDetails = () => {

  const params = useParams();
  const url = ([`${base}/movie/${params.id}`, `?api_key=${api}`, responseConfigParameter]).join('');
  const { pending, error, result, abort } = useFetch(url);

  const dispatch = useDispatch();
  const favouritesStore = useSelector(state => state.favouriteMovieIdsReducer.favouriteMovieIds);
  const ratedMoviesStore = useSelector(state => state.ratedMoviesReducer.ratedMovies);

  const title = result?.title;
  const image = result?.poster_path;
  const score = result?.vote_average;
  const description = result?.overview;
  const genres = result?.genres?.map(x => x.name) || [];
  const rating = result?.release_dates?.results?.find(x => x.iso_3166_1 === 'US')?.release_dates[0]?.certification || null;
  const releaseDate = result?.release_date?.split('-')[0];
  const runTime = `${result?.runtime} min`;
  const actors = result?.credits?.cast;
  const directors = result?.credits?.crew?.filter(x => x.department === 'Directing');

  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getFavouriteMovieIds());
    dispatch(getRatedMovies());
    window.scrollTo(0, 0);
  }, [params.id])

  return (
    <Fragment>
      <Row>
        <Col lg={9} md={12} sm={12} xs={12}>
          <Row>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Card>
                <CardHeader>
                  <Button.Ripple className='btn-icon rounded-circle' outline color='primary' onClick={() => handleClick()}>
                    <ArrowLeft size={16} />
                  </Button.Ripple>
                  <CardTitle className={'m-auto font-large-1'}>{title}</CardTitle>
                </CardHeader>
                <CardBody>
                  <ProgressiveImage
                    src={image && `https://image.tmdb.org/t/p/original/${image}`}
                    placeholder={image && `https://image.tmdb.org/t/p/w92/${image}`}
                  >
                    {src => <img src={src} alt={''} className={'d-block mx-auto img-fluid w-100'}
                                 style={{ filter: pending ? 'blur(2rem)' : 'none' }} />}
                  </ProgressiveImage>
                  {!image && (<Film size={500} className={'d-block mx-auto img-fluid w-100'} />)}
                  <CardText className={'mt-2 font-weight-bolder font-medium-3'}>Plot</CardText>
                  <CardText className={'font-medium-2'}>{description}</CardText>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <StarRating movieId={result?.id} ratedMovies={ratedMoviesStore.ratedMovies} />
                </CardBody>
              </Card>
            </Col>
            <Col lg={4} md={4} sm={12} xs={12}>
              <Row>
                <Col>
                  <FavouritesButton movieId={result?.id} favourites={favouritesStore.favouriteMovieIds}/>
                </Col>
              </Row>
              <Row className={'mb-2 mt-1'}>
                <Col lg={6} md={6} sm={6} xs={6}>
                  <MovieRating rating={score} />
                </Col>
                {rating && (
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Badge color={'primary'}
                           className={'badge-glow d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {rating}
                    </Badge>
                  </Col>
                )}
              </Row>
              <Row>
                {releaseDate && (
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Badge color={'light-secondary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {releaseDate}
                    </Badge>
                  </Col>
                )}
                {runTime !== '0 min' && (
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Badge color={'light-secondary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {runTime}
                    </Badge>
                  </Col>
                )}
              </Row>
              {genres?.map((element, index) => (
                <Row key={index} className={'mt-2 mb-2'}>
                  <Col>
                    <Badge color={'light-primary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {element}
                    </Badge>
                  </Col>
                </Row>
              ))}
              <Profiles data={directors} profileType={'Directors'} />
            </Col>
            <Col lg={3} md={6} sm={12} xs={12} className={'d-none d-lg-none d-md-block d-sm-block'}>
              <Profiles data={actors} profileType={'Actors'} />
            </Col>
            <Col lg={3} md={6} sm={12} xs={12} className={'d-block d-sm-none'}>
              <Profiles data={actors} profileType={'Actors'} />
            </Col>
            <Col lg={12} md={6} sm={12} xs={12}>
              <MovieRecommendations id={params.id} favourites={favouritesStore.favouriteMovieIds} />
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={6} sm={12} xs={12} className={'d-none d-lg-block'}>
          <Profiles data={actors} profileType={'Actors'} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default MovieDetails;