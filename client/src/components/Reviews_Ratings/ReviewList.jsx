import React, { useState } from 'react';
import Review from './review.jsx';

const ReviewList = ({reviews}) => {


  return (
    <div>
      {reviews.map(review => {
        return <Review key={review.review_id} review={review}/>
      })}
    </div>
  )
}

export default ReviewList;