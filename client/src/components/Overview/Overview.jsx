import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import token from '../../../../config.js';
import PrimaryImage from './PrimaryImage.jsx';

var Overview = (props) => {

  const [products, getProducts] = useState([{data: 'hello'}]);
  const [counter, getCounter] = useState(0);

  let fetchProducts = () => {
    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx54/products', {
        headers: {
          'Authorization': token
        }
      })
      .then((results) => {
        getProducts(results);
        getCounter(counter + 1);
        console.log(results);
        console.log(`ran the request ${counter} times`);
      })
      .catch((err) => {
        console.log('there was an error in your axios call: ', err);
      });
  };

  useEffect(() => {
    fetchProducts();
    // document.getElementsByClassName('product-data')[0].innerHTML = `the product is ${products.data}`;
  }, []);

  return (
    <div class="container">
      <div className="row">
        <div className="col-8 main_pic">
          {/* <button onClick={fetchProducts}>Fetch products</button>
          <p className="product-data">print products here: </p> */}
          <PrimaryImage />
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
