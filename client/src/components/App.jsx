import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import YourOutfit from './YourOutfit/YourOutfit.jsx';
import Overview from './Overview/Overview.jsx';
import RatingsReviews from './ReviewsRatings/RatingsReviews.jsx';
import QuestionsList from './QuestionsAnswers/QuestionsList.jsx';

const App = (props) => {
  const [currentProductId, changeCurrentProductId] = useState(21111);

  const axiosGetProductId = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${id}`, {
      headers: {
        'Authorization': API_KEY
      }
    })
      .then(response => changeCurrentProductId(response.data.id))
      .catch((error) => console.error(error));
  };
  // Function needed for resetting
  const setNewId = (e) => {
    changeCurrentProductId(e.currentTarget.attributes[0].nodeValue);
  };

  useEffect(() => {
    axiosGetProductId(currentProductId);
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="top_bar col-8">Top Bar Goes Here</div>
      </div>
      <Overview productId={ currentProductId }/>
      <RelatedProducts currentId={ currentProductId } handleClick={ setNewId } />
      <YourOutfit />
      <QuestionsList productId={ currentProductId }/>
      <RatingsReviews productId={ currentProductId } changeId={ changeCurrentProductId }/>
    </div>
  );
};

export default App;