import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config.js';
import PrimaryImage from './PrimaryImage.jsx';
import sampleData from './sampleData';

var Overview = ({ productId }) => {

  const [product, getProduct] = useState(sampleData);

  let fetchProduct = (product = '21111') => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${product}/styles`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((results) => {
        getProduct(results.data);
        getFoculProduct(results.data.results[0].photos[0].url);
        console.log('Photo Url?', results.data.results[0].photos[0].url);
      })
      .catch((err) => {
        console.log('there was an error in your axios call: ', err);
      });
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  return (
    <div className="container overview-container">
      <div className="row">
        <div className="col-8 main_pic">
          <PrimaryImage product={ product } />
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
