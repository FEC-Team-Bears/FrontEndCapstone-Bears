import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import YourOutfit from './YourOutfit/YourOutfit.jsx';
import Overview from './Overview/Overview.jsx';
import RatingsReviews from './ReviewsRatings/RatingsReviews.jsx';
import QuestionsList from './QuestionsAnswers/QuestionsList.jsx';

const App = (props) => {
  const [productId, changeProductId] = useState(21111);
  const [reviews, getAllReviews] = useState([]);

  const axiosGetProductId = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${id}`, {
      headers: {
        'Authorization': API_KEY
      }
    })
      .then(response => changeProductId(response.data.id))
      .catch((error) => console.error(error));
  };
  // Function needed for resetting
  const setNewId = (e) => {
    changeProductId(e.currentTarget.attributes[0].nodeValue);
  };

  const axiosGetAllReviews = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews', {
      headers: {
        'Authorization': API_KEY
      },
      params: {
        'product_id': `${productId}`
      }
    })
      .then(reviews => {
        getAllReviews(reviews.data.results);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axiosGetProductId(productId);
    axiosGetAllReviews();
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="top_bar col-8">Top Bar Goes Here</div>
      </div>
      <Overview productId={ productId }/>

      <RelatedProducts currentId={ productId } handleClick={ setNewId } />
      <YourOutfit />

      <QuestionsList productId={ productId }/>

      <RatingsReviews productId={ productId } changeId={ changeProductId } reviews={reviews} changeReviews={axiosGetAllReviews}/>
    </div>
  );
};

export default App;