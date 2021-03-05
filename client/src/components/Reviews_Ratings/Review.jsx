import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import StarRating from './StarRating.jsx';
import ReviewPhotos from './ReviewPhotos.jsx';
import axios from 'axios';
import API_KEY from '../../../../config.js';

const Review = ({ review }) => {

  const [recommendCount, setCount] = useState(review.helpfulness)

  const axiosUpdateRecommended = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/${review.review_id}/helpful`, {helpfulness: 0}, {
      headers: {
        'Authorization': API_KEY
      },
    })
      .then(reviews => {
        console.log(reviews);
        // getAllReviews(reviews.data.results)
      })
      .catch((error) => console.error(error))
  }

  // useEffect(() => {
  //   axiosUpdateRecommended();

  // }, [recommendCount]);

  return (
    <div>
      <div>
        <StarRating review={review} />
        {Moment(review.date).format('MMMM DD, YYYY')}
      </div>
      <h3>{review.summary}</h3>
      <p>{review.body}</p>
      {review.photos.map((photo, index) => {
        return <ReviewPhotos key={index} photo={photo} />
      })}
      <p>Helpful? <a onClick={() => axiosUpdateRecommended()}  href="#">Yes</a> ({review.helpfulness})</p>
      <hr />
    </div>
  )
}

export default Review;
