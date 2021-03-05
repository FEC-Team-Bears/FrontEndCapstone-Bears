import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Related_products from './Related_products/Related_products.jsx';
import Your_outfit from './Your_outfit/Your_outfit.jsx';
import RatingsReviews from './Reviews_Ratings/Ratings_Reviews.jsx';
import API_KEY from '../../../config.js';
// import Related_products from './Related_products/Related_products.jsx';
// import Your_outfit from './Your_outfit/Your_outfit.jsx';
// import QuestionsList from './Questions_answers/QuestionsList.jsx';


const App = () => {
  const [currentProductId, changeCurrentProductId] = useState(21111);

  const axiosGetProductId = (id) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${id}`, {
      headers: {
        'Authorization': API_KEY
      }
    })
    .then(response => {
      changeCurrentProductId(response.data.id)
    })
    .catch((error) => console.error(error))
  }

  useEffect(() => {
    axiosGetProductId(currentProductId);
  }, []);

  return (
    <div>

      <RatingsReviews productId={currentProductId} changeId={changeCurrentProductId}/>

      {/* <Related_products
        // related_products_star_rating={}
        // current_Id={}
      />
      <Your_outfit
        // your_outfit_star_rating={}
      /> */}
      {/* <QuestionsList /> */}

    </div>
  );
};

export default App;