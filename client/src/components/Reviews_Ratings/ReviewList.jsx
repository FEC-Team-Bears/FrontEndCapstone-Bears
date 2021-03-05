import React, { useState } from 'react';
import Review from './review.jsx';
import NewReview from './NewReview.jsx'
import { Modal, Button, Form } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';


const ReviewList = ({ reviews }) => {
  
  return (
    <div>
      {reviews.map(review => {
        return <Review key={review.review_id} review={review} />
      })}

      <NewReview />

    </div>
  )
}

export default ReviewList;