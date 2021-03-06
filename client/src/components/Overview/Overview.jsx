import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import API_KEY from '../../../../config.js';
import PrimaryImage from './PrimaryImage.jsx';
import sampleData from './sampleData';

var Overview = (props) => {

  const [styles, getStyles] = useState(sampleData);
  const [foculProduct, getFoculProduct] = useState('randomurl.com');

  let fetchStyles = (style = '21111') => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${style}/styles`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((results) => {
        getStyles(results.data);
        getFoculProduct(results.data.results[0].photos[0].url);
        console.log('Photo Url?', results.data.results[0].photos[0].url);
      })
      .catch((err) => {
        console.log('there was an error in your axios call: ', err);
      });
  };

  useEffect(() => {
    fetchStyles();
    // document.getElementsByClassName('product-data')[0].innerHTML = `the product is ${Styles.data}`;
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 main_pic">
          <PrimaryImage styles={styles} />
        </div>
        <div className="col-4 main_details">
          Product Details go here
        </div>
      </div>
      <div>
        Product Description goes here
      </div>
    </div>
  );

};

export default Overview;
