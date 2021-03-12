import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
import { ProgressBar } from 'react-bootstrap';

const RatingsList = ({ reviews, reviewMetaData }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewRatings, setReviewRatings] = useState(0);
  const [reviewCharsKeys, setReviewCharsKeys] = useState([]);
  const [recommendPercent, setRecommendPercent] = useState(0);

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

  const findReviewChars = () => {
    let keys = Object.keys(reviewMetaData.characteristics);
    setReviewCharsKeys(keys);
  };

  const calculateRecommendPercent = () => {
    let recommend = Number(reviewMetaData.recommended.true);
    let notRecommend = Number(reviewMetaData.recommended.false);
    let total = recommend + notRecommend;
    setRecommendPercent((Math.round((recommend / total) * 100)));
  };


  useEffect(() => {
    findAverageRating();
    setReviewRatings(reviewMetaData.ratings);
    findReviewChars();
    calculateRecommendPercent();
  }, [reviews, reviewMetaData]);

  return (

    <div className="ratings-container">
      <h5>Ratings &amp; Reviews</h5>
      <div className="average-ratings">
        <h1>{averageRating}</h1>
        <StarRating reviews={reviews} />
      </div>
      <p className="recommend-percent">{recommendPercent}% of reviews recommend this product</p>
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
      {reviewCharsKeys.map((char, index) => {
        return (
          <div>
            {reviewMetaData.characteristics[char] ?
              <div>
                <p className="rating-characteristic">{char}</p>
                <div className="rating-grey-slider-container">
                  <div className="rating-grey-slider">
                    <p className="rating-triangle" style={{ 'left': `${(reviewMetaData.characteristics[char].value * 55)}px` }}>
                  &#9662;
                    </p>
                  </div>&nbsp;<div className="rating-grey-slider"></div>&nbsp;<div className="rating-grey-slider"></div>
                </div>
                <div className="rating-char-values">
                  <p>poor</p><p className="rating-perfect">average</p><p>great</p>
                </div>
              </div>
              : null}
          </div>
        );
      })}

    </div>
  );
};

export default RatingsList;
