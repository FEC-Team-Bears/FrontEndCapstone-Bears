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
      <h3 className="header-color">Ratings &amp; Reviews</h3>
      <div className="average-ratings">
        <h1>{averageRating}</h1>
        <StarRating className="rating-star-container" reviews={reviews} />
      </div>
      <p className="recommend-percent">{recommendPercent}% of reviews recommend this product</p>
      <div className="rating-sliders">
<<<<<<< HEAD
        <p className="body-color">5 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('5')} />
        <p className="body-color">4 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('4')} />
        <p className="body-color">3 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('3')} />
        <p className="body-color">2 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('2')} />
        <p className="body-color">1 Stars</p>
=======
        <p className="rating-star-color">5 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('5')} />
        <p className="rating-star-color">4 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('4')} />
        <p className="rating-star-color">3 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('3')} />
        <p className="rating-star-color">2 Stars</p>
        <ProgressBar variant="custom" now={collectAllReviews('2')} />
        <p className="rating-star-color">1 Stars</p>
>>>>>>> 5abb57c9b0eedce0af2c35a75b656f753a0aa96e
        <ProgressBar variant="custom" now={collectAllReviews('1')} />
      </div>
      {reviewCharsKeys.map((char, index) => {
        return (
          <div>
            {reviewMetaData.characteristics[char] ?
              <div className="rating-char-container">
                <p className="rating-characteristic header-color">{char}</p>
                <div className="rating-grey-slider-container">
                  <div className="rating-grey-slider">
                    <p className="rating-triangle color" style={{ 'left': `${(reviewMetaData.characteristics[char].value * 55)}px` }}>
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
