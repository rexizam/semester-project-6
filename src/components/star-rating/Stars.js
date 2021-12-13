import { Rating } from 'react-simple-star-rating';
import React from 'react';

const Stars = ({ userRating, rating, setRating }) => {

  const handleRating = (rate: number) => {
    setRating(rate / 10)
  }

  return (
    <>
      {userRating && (
        <Rating onClick={handleRating} ratingValue={userRating} size={35} iconsCount={10} fillColor={'#675aca'} transition allowHalfIcon readonly />
      )}
      {!userRating && (
        <Rating onClick={handleRating} ratingValue={rating} size={35} iconsCount={10} fillColor={'#675aca'} transition allowHalfIcon />
      )}
    </>
  )
}

export default Stars