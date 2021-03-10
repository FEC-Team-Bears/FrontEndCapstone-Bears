import React, { useState, useEffect } from 'react';

const StarRating = ({ review, reviews }) => {
  let rating;
  review ? rating = review.rating : null;

  const findAverageRating = () => {
    let sum = 0;
    let length = reviews.length;
    reviews.map(review => {
      sum += review.rating;
    });

    let average = Math.round(10 * (sum / length)) / 10;
    rating = average;
  };

  reviews ? findAverageRating() : null;

  let stars = [];
  while (stars.length < 5) {
    if (rating >= 1) {
      stars.push(1);
    } else if (rating > 0) {
      let empty = Math.abs(0 - rating);
      let quart = Math.abs(0.25 - rating);
      let half = Math.abs(0.5 - rating);
      let three = Math.abs(0.75 - rating);
      let closest = Math.min(empty, quart, half, three);
      switch (closest) {
      case (empty):
        stars.push(0);
        break;
      case quart:
        stars.push(0.25);
        break;
      case half:
        stars.push(0.5);
        break;
      case three:
        stars.push(0.75);
        break;
      default:
        console.log('OOPS');
        stars.push(0);
        break;
      }
    } else {
      stars.push(0);
    }
    rating = rating - 1;
  }

  return (
    <div>
      {stars.map((item, i) => {
        return (
          <div className="single-star-container" key={i}>
            <div className="single-star-fill" style={{ 'width': `${Number(item * 16)}px` }}>
              <img className="single-star-outline" src="../dist/assets/images/star.png"></img>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;