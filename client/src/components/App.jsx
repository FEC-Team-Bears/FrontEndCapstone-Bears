import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import RatingsReviews from './ReviewsRatings/RatingsReviews.jsx';
import API_KEY from '/config.js';

const App = () => {
  const [currentProductId, changeCurrentProductId] = useState(21111);

  const axiosGetProductId = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${id}`, {
      headers: {
        'Authorization': API_KEY
      }
    })
      .then(response => {
        changeCurrentProductId(response.data.id);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axiosGetProductId(currentProductId);
  }, []);

  return (
    <div>

      <RatingsReviews productId={currentProductId} changeId={changeCurrentProductId} />


    </div>
  );
};

export default App;