import { useHistory, useParams } from 'react-router-dom';
import { api, base, responseConfigParameter } from '../../network/Constants';
import { useFetch } from 'react-hooks-async';
import React, { Fragment, useEffect } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteMovieIds } from '../../redux/actions/favouriteMoviesIds';
import ProgressiveImage from 'react-progressive-graceful-image';
import { ArrowLeft } from 'react-feather';
import { Cell, Provider as GridProvider } from 'griding';
import * as GridConfig from '../../configs/gridConfig';
import MovieCard from '../../components/movie-card/MovieCard';
import placeholder from '../../assets/images/icons/profile-placeholder.png';

const PersonDetails = () => {

  const params = useParams();
  const url = ([`${base}/person/${params.id}`, `?api_key=${api}`, responseConfigParameter]).join('');
  const { pending, error, result, abort } = useFetch(url);

  const dispatch = useDispatch();
  const favouritesStore = useSelector(state => state.favouriteMovieIdsReducer.favouriteMovieIds);

  const name = result?.name;
  const placeOfBirth = result?.place_of_birth;
  const image = result?.profile_path;
  const biography = result?.biography;
  const birthday = result?.birthday;
  const actedOn = result?.credits?.cast;

  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getFavouriteMovieIds());
    window.scrollTo(0, 0);
  }, [params.id])

  return (
    <Fragment>
      <Row className={'d-flex justify-content-center'}>
        <Col lg={5} md={12} sm={12} xs={12}>
          <Card>
            <CardHeader>
              <Button.Ripple className='btn-icon rounded-circle' outline color='primary' onClick={() => handleClick()}>
                <ArrowLeft size={16} />
              </Button.Ripple>
              <CardTitle className={'m-auto font-large-1'}>{name}</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                {placeOfBirth && (
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Badge color={'light-primary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1 text-wrap'}>
                      {placeOfBirth}
                    </Badge>
                  </Col>
                )}
                {birthday && (
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <Badge color={'light-primary'}
                           className={'d-flex justify-content-center align-items-center w-100 h-100 font-medium-1'}>
                      {birthday}
                    </Badge>
                  </Col>
                )}
              </Row>
              {biography && (<CardText className={'mt-2 font-weight-bolder font-medium-3'}>Biography</CardText>)}
              {biography?.split('\n\n').map((paragraph, index) => (
                  <CardText className={'font-medium-2'} key={index}>
                    {paragraph.split('\n').reduce((total, line) => [total, <br />, line])}
                  </CardText>
                )
              )}
            </CardBody>
          </Card>
        </Col>
        <Col lg={4} md={12} sm={12} xs={12}>
          <ProgressiveImage
            src={image && `https://image.tmdb.org/t/p/original/${image}`}
            placeholder={image && `https://image.tmdb.org/t/p/w92/${image}`}
          >
            {src => <img src={src} alt={''} className={'d-block mx-auto img-fluid w-100'} style={{ filter: pending ? 'blur(2rem)' : 'none' }} />}
          </ProgressiveImage>
          {!image && (<img src={placeholder} alt={''} className={'d-block mx-auto img-fluid w-100'} />)}
        </Col>
      </Row>
      {actedOn?.length > 0 && (
        <div>
          <CardTitle className={'font-large-1 text-center mt-5 mb-3'} style={{textDecoration: 'underline'}}>Acted On</CardTitle>
          <GridProvider columns={GridConfig.columns} breakpoints={GridConfig.breakpoints}>
            <Row style={{ marginBottom: '2rem', justifyContent: 'space-around' }}>
              {actedOn?.map(movie => (
                <Cell key={movie.id} xs={6} sm={4} md={3} xg={2}>
                  <MovieCard movieData={movie} isFavourite={favouritesStore?.favouriteMovieIds?.includes(movie.id)} />
                </Cell>
              ))}
            </Row>
          </GridProvider>
        </div>
      )}
    </Fragment>
  )
}

export default PersonDetails