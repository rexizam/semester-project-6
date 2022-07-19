import { Button } from 'reactstrap';
import React, { Fragment, useEffect, useState } from 'react';
import Avatar from '../../@core/components/avatar';
import { Coffee } from 'react-feather';
import { Slide, toast } from 'react-toastify';
import { getRealmService } from '../../realm-cli';
import Rating from 'react-rating';
import useBreakpoint from '../../utility/hooks/useBreakPoint';

const StarRating = ({ movieId, ratedMovies }) => {

  const [rating, setRating] = useState(0.5);
  const [isRated, setIsRated] = useState(false);
  const realmService = getRealmService();
  const breakpoint = useBreakpoint();

  const handleChange = (rating) => {
    setRating(rating);
  }

  useEffect(() => {
    const isMovieRated = ratedMovies?.filter(e => e.movieId === movieId);
    if (isMovieRated?.length > 0) {
      setRating(isMovieRated[0].movieRating)
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

  const starSizing = () => {
    switch (breakpoint) {
      case 'xl':
        return 50
      case 'lg':
        return 46
      case 'md':
        return 32
      case 'sm':
        return 32
      case 'xs':
        return 22
    }
  }

  const SVGIcon = (props) => {
    return (
      <svg
        className={props.className}
        style={{margin: 3}}
        pointerEvents="none"
        viewBox='0 0 478.53 478.53'
        strokeLinecap='round'
        strokeLinejoin='round'
        width={starSizing()}
        height={starSizing()}
        xmlns='http://www.w3.org/2000/svg'
      >
        <use xlinkHref={props.href} />
        <path
          strokeWidth={4}
          stroke={'#675aca'}
          fill={props.href === '#icon-star-empty' ? 'rgba(0,0,0,0)' : '#675aca' }
          d="M477.795,184.279c-1.765-5.431-6.458-9.389-12.108-10.209l-147.159-21.384l-65.812-133.35
          c-2.527-5.12-7.741-8.361-13.451-8.361s-10.924,3.241-13.451,8.361l-65.812,133.35L12.843,174.07
          c-5.65,0.82-10.344,4.778-12.108,10.209c-1.765,5.43-0.293,11.391,3.796,15.376l106.484,103.798L85.877,450.018
          c-0.965,5.627,1.349,11.314,5.968,14.671c4.618,3.354,10.741,3.799,15.797,1.142l131.623-69.199l131.623,69.199
          c2.195,1.153,4.592,1.723,6.979,1.723c3.11,0,6.205-0.966,8.818-2.864c4.619-3.356,6.933-9.044,5.968-14.671l-25.138-146.565
          l106.484-103.798C478.088,195.669,479.56,189.708,477.795,184.279z" />
      </svg>
    )
  }

  return (
    <>
      <div className={'d-flex justify-content-center align-items-center'}>
        <Rating
          start={0}
          stop={10}
          fractions={2}
          initialRating={rating}
          onChange={rating => handleChange(rating)}
          readonly={isRated}
          emptySymbol={<SVGIcon href="#icon-star-empty" className="icon" />}
          fullSymbol={<SVGIcon href="#icon-star-full" className="icon" />}
        />
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