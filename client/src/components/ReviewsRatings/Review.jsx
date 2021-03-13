import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import StarRating from './StarRating.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import axios from 'axios';
import API_KEY from '/config.js';

const Review = ({ review }) => {
  const [recommendCount, setRecommendCount] = useState(review.helpfulness);
  const [userThoughtHelpful, setUserThoughtHelpful] = useState(false);

  const axiosUpdateRecommended = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/${review.review_id}/helpful`, { helpfulness: 0 }, {
      headers: {
        'Authorization': API_KEY
      },
    })
      .then(reviews => {
        !userThoughtHelpful ? setRecommendCount(recommendCount + 1) : null;
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="single-review-container">
      <div className="review-date-container">
        <StarRating review={review} />
        <p>{Moment(review.date).format('MMMM DD, YYYY')}</p>
      </div>
      <h4 className="header-color">{ review.summary }</h4>
      <p>{review.body}</p>
      {(review.response !== null && review.response.length > 0) ?
        <div className="review-response">
          <h5>Response:</h5>
          <p>{review.response}</p>
        </div>
        : null}
      {review.photos.map((photo, index) => {
        return <ReviewPhotos key={index} photo={photo} />;
      })}
      <p>Helpful? <span className="clickable-color" onClick={() => {
        setUserThoughtHelpful(true);
        axiosUpdateRecommended();
      }
      }><span>Yes</span></span> ({recommendCount})</p>
    </div>
  );
};

export default Review;
