import React, { useState, useEffect } from 'react';
import Review from './review.jsx';
import NewReview from './NewReview.jsx';
import { Modal, Button, Form } from 'react-bootstrap';
import $ from 'jquery';

const ReviewList = ({ reviews, productId, reviewChar, loadReviews, loadMetaData, newReview, setNewReview }) => {
  const [count, setCount] = useState(2);

  const hideMoreReviewsButton = () => {
    if (count >= reviews.length) {
      $('#more-reviews-button').hide();
    } else {
      $('#more-reviews-button').show();
    }
  };

  return (
    <div>
      <h5 className='review-counter'>{reviews.length} reviews, sorted by <u>relevance</u></h5>
      {reviews.length > 0 ?
        reviews.slice(0, count).map(review => {
          return <Review key={review.review_id} review={review} />;
        })
        : null}
      {(count >= reviews.length) ? hideMoreReviewsButton() : null}

      <NewReview productId={productId} reviewChar={reviewChar} reviews={reviews} setCount={setCount} count={count} newReview={newReview} setNewReview={setNewReview} />
    </div>
  );
};


export default ReviewList;