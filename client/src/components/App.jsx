import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
// import Related_products from './Related_products/Related_products.jsx';
// import Your_outfit from './Your_outfit/Your_outfit.jsx';
import Questions_list from './Questions_answers/Questions_list.jsx';

const App = (prop) => {

  return (
    <div>
      <Related_products
        // related_products_star_rating={}
        // current_Id={}
      />
      <Your_outfit
        // your_outfit_star_rating={}
      />
      <Questions_list />
    </div>
  );
};

export default App;