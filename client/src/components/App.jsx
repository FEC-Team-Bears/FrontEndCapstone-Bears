import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import YourOutfit from './YourOutfit/YourOutfit.jsx';
import QuestionsList from './QuestionsAnswers/QuestionsList.jsx';
import RatingsReviews from './ReviewsRatings/RatingsReviews.jsx';
import API_KEY from '/config.js';

const App = (props) => {

  const [productId, changeProductId] = useState(21111);
  const [productImage, getProductImage] = useState();
  const [productDetails, getProductDetails] = useState({
    category: null,
    name: null,
    // eslint-disable-next-line camelcase
    default_price: null,
    features: [{}]
  });

  const axiosGetProductId = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${productId}`, {
      headers: {
        'Authorization': API_KEY
      }
    })
      .then(product => changeProductId(product.data.id))
      .catch(error => console.error(error));
  };

  const axiosGetProductDetails = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${productId}`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(product => getProductDetails(product.data))
      .catch(error => console.error(error));
  };

  const axiosGetProductImage = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${productId}/styles`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(product => getProductImage(product.data.results[0].photos[0]))
      .catch(error => console.error(error));
  };


  useEffect(() => {
    axiosGetProductId();
    axiosGetProductDetails();
  }, [productId]);

  // Function needed for ressetting through related card
  const setNewId = (e) => {
    changeProductId(e.currentTarget.attributes[0].nodeValue);
  };

  return (
    <div>
      <RelatedProducts productId={ productId } handleClick={ setNewId } />
      <YourOutfit />
      <QuestionsList productId={ productId } />
      <RatingsReviews productId={ productId } changeId={ changeProductId }/>
    </div>
  );
};

export default App;