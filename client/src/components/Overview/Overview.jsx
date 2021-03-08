import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../../../../config.js';
import PrimaryImage from './PrimaryImage.jsx';

var Overview = ({ productId }) => {

  const [product, getProduct] = useState([]);
  const [style, getStyle] = useState(0);

  let fetchProduct = (product = '21111') => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${product}/styles`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((results) => {
        getProduct(results.data.results[style].photos);
      })
      .catch((err) => {
        console.error('there was an error in your axios call: ', err);
      });
  };

  const setStyle = (style) => {
    getStyle(style);
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  return (
    <div className="container overview-container">
      <div className="row">
        <div className="col-8 main-pic">
          <PrimaryImage product={ product } style={ style } setStyle={ setStyle }/>
        </div>
        <div className="col-4 main-details">
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
