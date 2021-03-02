import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config.js';
import reviews_data from './sample_review_data.js';
import ReviewList from './ReviewList.jsx'

const Ratings_Reviews = () => {
  const [reviews, getAllReviews] = useState([]);

  const axiosGetAllReviews = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews`, {
      headers: {
        'Authorization': API_KEY
      },
      params: {
        'product_id': 21112
      }
    })
    .then(reviews => {
      console.log(reviews.data.results);
      getAllReviews(reviews.data.results)
    })
    .catch((error) => console.error(error))
  }

  useEffect(() => {
    axiosGetAllReviews();

  }, []);

  return (
    <div>
      <ReviewList reviews={reviews}/>
    </div>
  )
}

export default Ratings_Reviews;