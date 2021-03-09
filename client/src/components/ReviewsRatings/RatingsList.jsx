import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import { ProgressBar } from 'react-bootstrap';

const RatingsList = ({ reviews, reviewMetaData }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewRatings, setReviewRatings] = useState(0);
  const [reviewChars, setReviewChars] = useState({});


  const findAverageRating = () => {
    let sum = 0;
    let length = reviews.length;
    reviews.map(review => {
      sum += review.rating;
    });

    let average = Math.round(10 * (sum / length)) / 10;
    setAverageRating(average);
  };

  const collectAllReviews = (starRating) => {
    let total = 0;
    for (let key in reviewRatings) {
      total += Number(reviewRatings[key]);
    }
   

    return (Number(reviewRatings[starRating]) / total) * 100;
  };


  useEffect(() => {
    findAverageRating();
    setReviewRatings(reviewMetaData.ratings);
    setReviewChars(reviewMetaData.characteristics);
  });

  return (
    <div>
      <h5>Ratings &amp; Reviews</h5>
      <div className="average-ratings">
        <h1>{averageRating}</h1>
        <StarRating reviews={reviews} />
      </div>
      <div className="rating-sliders">
        <p>5 Stars</p>
        <ProgressBar variant="success" now={collectAllReviews('5')} />
        <p>4 Stars</p>
        <ProgressBar variant="success" now={collectAllReviews('4')} />
        <p>3 Stars</p>
        <ProgressBar variant="success" now={collectAllReviews('3')} />
        <p>2 Stars</p>
        <ProgressBar variant="success" now={collectAllReviews('2')} />
        <p>1 Stars</p>
        <ProgressBar variant="success" now={collectAllReviews('1')} />
      </div>
    </div>
  );
};

export default RatingsList;
