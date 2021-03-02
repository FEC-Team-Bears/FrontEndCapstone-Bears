import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import token from '../../../../config.js';

const Related_product_card = ({ related_product_Id }) => {

  //eventually, I will need some kind of hook to manage the state of the star button here
  const [productDetails, getProductDetails] = useState({
    category: null,
    name: null,
    default_price: null
  });

const [productImage, getProductImage] = useState({});

  const axiosGetRelatedProductDetails = () => {
    axios // workable ID is 21111, but in the future, you'll want to use ${current_Id}
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${related_product_Id}`, {
        headers: {
          'Authorization': token
        }
      })
      .then((product) => getProductDetails(product.data))
      .catch((error) => console.error(error))
  }

  const axiosGetRelatedProductImage = () => {
    axios // workable ID is 21111, but in the future, you'll want to use ${current_Id}
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${related_product_Id}/styles`, {
        headers: {
          'Authorization': token
        }
      })
      .then((product) => getProductImage(product.data.results[0].photos[0]))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    axiosGetRelatedProductDetails();
    axiosGetRelatedProductImage();
  }, []);

  return (
    <div id='Test'>
      <img src={productImage.thumbnail_url} />
      {productDetails.category}
      {productDetails.name}
      {productDetails.default_price}
    </div>
  )
}

export default Related_product_card;