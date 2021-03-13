import React, { useState, useEffect } from 'react';
import Review from './review.jsx';
import NewReview from './NewReview.jsx';
import { Modal, Button, Form } from 'react-bootstrap';
import $ from 'jquery';

const ReviewList = ({ reviews, productId, reviewChar, loadReviews, loadMetaData, newReview, setNewReview, count, setCount }) => {
  const [show, setShow] = useState(false);
  const [reviewsByDate, setReviewsByDate] = useState([]);
  const [sortObject, setSortObject] = useState({1: reviews});
  const [sortCount, setSortCount] = useState(1);
  const handleShow = () => setShow(true);

  const hideMoreReviewsButton = () => {
    if (count >= reviews.length) {
      $('#more-reviews-button').hide();
      $('#less-reviews-button').show();
    }
  };

  const updateCount = () => {
    setCount(count + 2);
  };

  const revertCount = () => {
    setCount(2);
    $('#more-reviews-button').show();
    $('#less-reviews-button').hide();
  };

  const sortByDate = () => {
    let obj = sortObject;
    const date = reviews.slice().sort((a, b) => {
      let c = new Date(a.date);
      let d = new Date(b.date);
      return d - c;
    });

    obj[2] = date;
    obj[1] = reviews;
    setSortObject(obj);
  };

  const sortByRelevance = () => {
    let obj = sortObject;
    const relevance = reviews.slice().sort((a, b) => {
      let c = new Date(a.date);
      let d = new Date(b.date);

      if (a.helpfulness < b.helpfulness) {
        return 1;
      }
      if (a.helpfulness > b.helpfulness) {
        return -1;
      }
      if (c < d) {
        return 1;
      }
      if (c > d) {
        return -1;
      }

    });
    obj[3] = relevance;
    obj[1] = reviews;
    setSortObject(obj);
  };


  useEffect(() => {
    sortByDate();
    sortByRelevance();
  }, [reviews, newReview]);


  return (
    <div>
      <h5 className='review-counter'>{reviews.length} reviews, sorted by&nbsp;
        <select className="review-sort-dropdown" onChange={(e) => setSortCount(e.target.value)}>
          <option value="1">helpful</option>
          <option value="2">newest</option>
          <option value="3">relevance</option>
        </select>
      </h5>
      <div className="reviews-container">
        {reviews.length > 0 ?
          sortObject[sortCount].slice(0, count).map(review => {
            return <Review key={review.review_id} review={review} />;
          })
          : null}

        {(count >= reviews.length) ? hideMoreReviewsButton() : null}

        <NewReview
          productId={productId}
          reviewChar={reviewChar}
          reviews={reviews}
          newReview={newReview}
          setNewReview={setNewReview}
          show={show}
          setShow={setShow}
          loadReviews={loadReviews}/>
      </div>
      <Button id="more-reviews-button" variant="outline-dark" onClick={updateCount}>More Reviews</Button>
      <Button id="less-reviews-button" variant="outline-dark" onClick={revertCount}>Less Reviews ^</Button>
      <Button id="add-reviews-button" variant="outline-dark" onClick={handleShow}>Add a Review +</Button>
    </div>
  );
};


export default ReviewList;