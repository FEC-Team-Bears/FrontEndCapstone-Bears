import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import token from '../../config/config.js';

const Related_products = ({ current_Id }) => {

  const [related_products, getRelatedProducts] = useState([]);

  const axiosGetRelatedProductDetails = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx54/products/${current_Id}/related`, {
        headers: {
          'Authorization': token
        }
      })
      .then((productsArray) => getRelatedProducts(productsArray))
      .catch((error) => console.error(error))
  }

  return (
    <div>
      {related_products.map((product_Id) => {
        <Related_product_card related_product_Id={ product_Id } />
      })}
    </div>
  )
}

export default Related_products;