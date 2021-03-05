import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import ReviewList from './ReviewList.jsx'

const RatingsReviews = ({productId, changeId}) => {
  const [reviews, getAllReviews] = useState([]);

  const axiosGetAllReviews = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews`, {
      headers: {
        'Authorization': API_KEY
      },
      params: {
        'product_id': `${productId}`
      }
    })
    .then(reviews => {
      // console.log(reviews.data.results);
      getAllReviews(reviews.data.results)
    })
    .catch((error) => console.error(error))
  }

  const axiosGetAllMetaData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/meta`, {
      headers: {
        'Authorization': API_KEY
      },
      params: {
        'product_id': `${productId}`
      }
    })
    .then(reviews => {
      console.log(reviews.data);
      // getAllReviews(reviews.data.results)
    })
    .catch((error) => console.error(error))
  }



  useEffect(() => {
    axiosGetAllReviews();
    axiosGetAllMetaData();

  }, [productId]);

  return (
    <div>
      <ReviewList reviews={reviews} productId={productId}/>
      {/* Leaving for testing purposes */}
      <button onClick={() => {changeId(21114)}}>Hello</button>
    </div>
  )
}

export default RatingsReviews;