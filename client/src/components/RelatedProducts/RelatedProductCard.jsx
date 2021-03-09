import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button} from 'react-bootstrap';
import API_KEY from '../../../../config.js';

const RelatedProductCard = ({ relatedProductId, handleClick }) => {

  //eventually, I will need some kind of hook to manage the state of the star button here

  const [productDetails, getProductDetails] = useState({
    category: null,
    name: null,
    // eslint-disable-next-line camelcase
    default_price: null
  });

  const [productImage, getProductImage] = useState({});

  const axiosGetRelatedProductDetails = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${relatedProductId}`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((product) => getProductDetails(product.data))
      .catch((error) => console.error(error));
  };

  const axiosGetRelatedProductImage = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${relatedProductId}/styles`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then((product) => getProductImage(product.data.results[0].photos[0]))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axiosGetRelatedProductDetails();
    axiosGetRelatedProductImage();
  }, [relatedProductId]);

  return (
    <div onClick={ handleClick } data-id={ relatedProductId } >
      <div className="image-div">
        {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="detailComparisonTable" style={{ background: "none", color: "black", border: "none", position: "absolute" }}>&#9734;</button> */}
        <img style={{ position: 'relative' }} className="card-image-top" src={productImage.url} alt={productDetails.name} />
      </div>

      <div className="card-body">
        <div className="card-category">{productDetails.category}</div>
        <div className="card-name"><strong>{productDetails.name}</strong></div>
        <div className="card-price">{'$' + productDetails.default_price}</div>
        {/* <StarComponent productId={ relatedProductId } /> */}
      </div>
    </div>
  );
};

export default RelatedProductCard;