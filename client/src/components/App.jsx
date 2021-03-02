import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';

const App = (prop) => {

  return (
    <div>
      <Related_products
        related_products_star_rating={}
      />
      <Your_outfit
        your_outfit_star_rating={}
      />
    </div>
  )
}

export default App;