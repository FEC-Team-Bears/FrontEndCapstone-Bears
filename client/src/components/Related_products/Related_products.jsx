import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import token from '../../../../config.js';
import Related_product_card from './Related_product_card.jsx';

const Related_products = ({ current_Id }) => {

  const [related_products, getRelatedProducts] = useState([]);

  const axiosGetRelatedProducts = () => {
    axios // workable ID is 21111, but in the future, you'll want to use ${current_Id}
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/21118/related`, {
        headers: {
          'Authorization': token
        }
      })
      .then((products) => getRelatedProducts(products.data))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    axiosGetRelatedProducts();
  }, []);

  return (
    <div>
      {related_products.map((product_Id) => {
        return <Related_product_card related_product_Id={ product_Id } key={product_Id} />;
      })}
    </div>
  )
}

export default Related_products;