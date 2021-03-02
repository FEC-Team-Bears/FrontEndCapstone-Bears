import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Related_products from './Related_products/Related_products.jsx';
import Your_outfit from './Your_outfit/Your_outfit.jsx';
import Ratings_Reviews from './Reviews_Ratings/Ratings_Reviews.jsx';

const App = (prop) => {

  return (
    <div>
      <Ratings_Reviews/>
      
    </div>
  )
}

export default App;