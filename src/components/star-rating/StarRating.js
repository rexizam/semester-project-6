import { Button } from 'reactstrap';
import React, { Fragment, useEffect, useState } from 'react';
import Avatar from '../../@core/components/avatar';
import { Coffee } from 'react-feather';
import { Slide, toast } from 'react-toastify';
import { getRealmService } from '../../realm-cli';
import Stars from './Stars';

const StarRating = ({ movieId, ratedMovies }) => {

  const [rating, setRating] = useState(0.5);
  const [isRated, setIsRated] = useState(true);
  const realmService = getRealmService();

  const getRating = () => {
    const isMovieRated = ratedMovies?.filter(e => e.movieId === movieId);
    if (isMovieRated?.length > 0) {
      return isMovieRated[0].movieRating;
    }
  }

  useEffect(() => {
    const isMovieRated = ratedMovies?.filter(e => e.movieId === movieId);
    if (isMovieRated?.length > 0) {
      setIsRated(true);
    } else {
      setIsRated(false);
    }
  }, [ratedMovies])

  const ToastContent = ({ header, message }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title font-weight-bold'>{header}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{message}</span>
      </div>
    </Fragment>
  );

  const handleClick = async () => {
    await realmService.currentUser.functions.callFunction('submitMovieRating', movieId, rating).then(() => {
      setIsRated(true);
      toast.success(
        <ToastContent header={'Thank you!'} message={'Your vote has been successfully submitted.'} />,
        { transition: Slide, hideProgressBar: true, autoClose: 3000 }
      );
    });
  }

  return (
    <>
      <div className={'d-flex justify-content-center align-items-center'}>
        <Stars userRating={getRating()} rating={rating} setRating={setRating} isRated={isRated} />
      </div>
      <div className={'d-flex justify-content-center align-items-center mt-2'}>
        {isRated && (
          <Button.Ripple
            className={'w-75'}
            color='primary'
            onClick={() => handleClick()}
            disabled
            outline
          >
            <span>{'Your vote was submitted'}</span>
          </Button.Ripple>
        )}
        {!isRated && (
          <Button.Ripple
            className={'w-75'}
            color='primary'
            onClick={() => handleClick()}
            outline
          >
            <span>{'Submit vote'}</span>
          </Button.Ripple>
        )}
      </div>
    </>
  )
}

export default StarRating