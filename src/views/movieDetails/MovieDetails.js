import { Card, CardBody, CardHeader, CardText, CardTitle, Row, Col, Badge, Button } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { api, base, responseConfigParameter } from '../../network/Constants';
import { useFetch } from 'react-hooks-async';
import Profiles from '../../components/movie-details/Profiles';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import MovieRating from '../../components/movie-details/MovieRating';
import { ArrowLeft, Film } from 'react-feather';
import MovieRecommendations from '../../components/movie-recommendations/MovieRecommendations';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteMovieIds } from '../../redux/actions/favouriteMoviesIds';
import FavouritesButton from '../../components/movie-details/FavouritesButton';
import StarRating from '../../components/star-rating/StarRating';
import { getRatedMovies } from '../../redux/actions/movieRatings';

const RETRY_COUNT = 5;
const RETRY_DELAY = 1000;

const MovieDetails = () => {

  const params = useParams();
  const url = ([`${base}/movie/${params.id}`, `?api_key=${api}`, responseConfigParameter]).join('');
  const { pending, error, result, abort } = useFetch(url);

  const dispatch = useDispatch();
  const favouritesStore = useSelector(state => state.favouriteMovieIdsReducer.favouriteMovieIds);
  const ratedMoviesStore = useSelector(state => state.ratedMoviesReducer.ratedMovies);

  const componentRef = useRef();
  const [imgError, setImgError] = useState(false);

  const budget = result?.budget;
  const title = result?.title;
  const image = result?.poster_path;
  const score = result?.vote_average;
  const description = result?.overview;
  const genres = result?.genres?.map(x => x.name) || [];
  const language = result?.original_language;
  const productionCountries = result?.production_countries;
  const revenue = result?.revenue;
  const voteCount = result?.vote_count;
  const rating = result?.release_dates?.results?.find(x => x.iso_3166_1 === 'US')?.release_dates[0]?.certification || null;
  const releaseDate = result?.release_date?.split('-')[0];
  const runTime = result?.runtime;
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

  useEffect(() => {
    componentRef.current = RETRY_COUNT;
  }, []);

  const handleError = useCallback(({ currentTarget }) => {
    setImgError(true);
    if (componentRef && componentRef.current && componentRef.current > 0) {
      setTimeout(() => {
        currentTarget.onerror = null;
        currentTarget.src = `https://image.tmdb.org/t/p/original/${image}`;
        componentRef.current = componentRef && componentRef.current && componentRef.current - 1;
      }, RETRY_DELAY);
    }
  }, []);

  const numberWithCommas = (x) => {
    //x.toLocaleString()
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

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
                  {image && (
                    <ProgressiveImage
                      delay={1000}
                      src={image && `https://image.tmdb.org/t/p/original/${image}`}
                      placeholder={image && `https://image.tmdb.org/t/p/w92/${image}`}
                      onError={handleError}
                    >
                      {src => <img src={src} alt={''} className={'d-block mx-auto img-fluid w-100'}
                                   style={{ filter: pending ? 'blur(2rem)' : 'none' }} />}
                    </ProgressiveImage>
                  )}
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
                  <MovieRating rating={score?.toFixed(1)} />
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
              {!!voteCount && (
                <Row className={'mb-1'}>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Badge color={'light-secondary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {`${numberWithCommas(voteCount)} votes`}
                    </Badge>
                  </Col>
                </Row>
              )}
              <Row className={'mb-1'}>
                {releaseDate && (
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Badge color={'light-secondary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {releaseDate}
                    </Badge>
                  </Col>
                )}
                {!!runTime && (
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Badge color={'light-secondary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {`${runTime} min`}
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
              {language && (
                <Card>
                  <CardBody className='profile-suggestion'>
                    <h5 className='mb-2 text-center'>Language</h5>
                    <Badge color={'light-primary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {language.toUpperCase()}
                    </Badge>
                  </CardBody>
                </Card>
              )}
              {!!budget && (
                <Card>
                  <CardBody className='profile-suggestion'>
                    <h5 className='mb-2 text-center'>Budget</h5>
                    <Badge color={'light-secondary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {`${numberWithCommas(budget)} $`}
                    </Badge>
                  </CardBody>
                </Card>
              )}
              {!!revenue && (
                <Card>
                  <CardBody className='profile-suggestion'>
                    <h5 className='mb-2 text-center'>Revenue</h5>
                    <Badge color={'light-secondary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {`${numberWithCommas(revenue)} $`}
                    </Badge>
                  </CardBody>
                </Card>
              )}
              {productionCountries?.length > 0 && (
                <Card>
                  <CardBody className='profile-suggestion'>
                    <h5 className='mb-2 text-center'>Production Countries</h5>
                    {productionCountries.map((element, index) => (
                      <Badge key={index}
                             color={'light-primary'}
                             className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1 mb-1'}>
                        {element.iso_3166_1}
                      </Badge>
                    ))}
                  </CardBody>
                </Card>
              )}
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