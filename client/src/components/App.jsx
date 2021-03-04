import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import Overview from './Overview/Overview.jsx';


var App = (props) => {

  let productId = 21111;

  return (
    <div>
      <div className="row justify-content-center">
        <div className="top_bar col-8">Top Bar Goes Here</div>
      </div>
      <Overview productId={productId}/>
    </div>
  );

};

export default App;