import React from 'react';

const Review = ({ review }) => {
  return (
    <div>
      <h3>{review.summary}</h3>
      <p>{review.body}</p>
    </div>
  )
}

export default Review;