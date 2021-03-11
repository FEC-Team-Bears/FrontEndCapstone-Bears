import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import ReviewList from './ReviewList.jsx';
import RatingsList from './RatingsList.jsx';

const RatingsReviews = ({ productId, changeId, reviews, changeReviews, loadReviews }) => {
  const [reviewMetaData, useReviewMetaData] = useState(null);
  const [newReview, setNewReview] = useState(0);
  console.log(reviews);

  const axiosGetAllMetaData = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/meta', {
      headers: {
        'Authorization': API_KEY
      },
      params: {
        'product_id': `${productId}`
      }
    })
      .then(reviews => {
        useReviewMetaData(reviews.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axiosGetAllMetaData();
    loadReviews();
  }, [productId, newReview]);

  return (
    <div className="ratings-reviews-container">

      {(reviews.length > 0 && reviewMetaData) ?
        <div className="ratings-container">
          <RatingsList reviews={reviews} reviewMetaData={reviewMetaData} />
        </div>
        : <div></div>
      }
      {(reviews.length > 0 && reviewMetaData) ?
        <div className="reviews-container">
          <ReviewList
            reviews={reviews}
            productId={productId}
            reviewChar={reviewMetaData.characteristics}
            newReview={newReview}
            setNewReview={setNewReview}
          />
        </div>
        : null
      }
    </div>

  );
};

export default RatingsReviews;