import React, { useState } from 'react';
import axios from 'axios';
import reviews_data from './sample_review_data.js';

const Ratings_Reviews = () => {
  const [reviews, getAllReviews] = useState(reviews_data);

  return (
    <div>
      <ReviewList />
    </div>
  )
}

export default Ratings_Reviews;