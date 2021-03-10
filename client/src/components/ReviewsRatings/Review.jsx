import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import StarRating from './StarRating.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import axios from 'axios';
import API_KEY from '/config.js';

const Review = ({ review }) => {

  const [recommendCount, setRecommendCount] = useState(review.helpfulness);

  const axiosUpdateRecommended = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/${review.review_id}/helpful`, { helpfulness: 0 }, {
      headers: {
        'Authorization': API_KEY
      },
    })
      .then(reviews => {
        setRecommendCount(recommendCount + 1);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div>
        <StarRating review={review} />
        {Moment(review.date).format('MMMM DD, YYYY')}
      </div>
      <h3>{review.summary}</h3>
      <p>{review.body}</p>
      {review.photos.map((photo, index) => {
        return <ReviewPhotos key={index} photo={photo} />;
      })}
      <p>Helpful? <a onClick={() => axiosUpdateRecommended()} href="#">Yes</a> ({recommendCount})</p>
      <hr />
    </div>
  );
};

export default Review;
