import React, { useState } from 'react';
import Review from './review.jsx';
import NewReview from './NewReview.jsx'
import { Modal, Button, Form } from 'react-bootstrap';

const ReviewList = ({ reviews, productId }) => {

  return (
    <div>
      {reviews.map(review => {
        return <Review key={review.review_id} review={review} />
      })}

      <NewReview productId={productId}/>

    </div>
  )
}

export default ReviewList;