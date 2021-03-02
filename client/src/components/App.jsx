import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Overview from './Overview/Overview.jsx';


var App = (props) => {

  return (
    <div>
      <div className="row justify-content-center">
        <div className="top_bar col-8">Top Bar Goes Here</div>
      </div>
      <Overview />
    </div>
  );

};

export default App;