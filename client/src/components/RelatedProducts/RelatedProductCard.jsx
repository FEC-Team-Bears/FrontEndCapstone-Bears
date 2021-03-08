import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import API_KEY from '/config.js';

const RelatedProductCard = ({ relatedProductId, handleClick }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productDetails, getProductDetails] = useState({
    category: null,
    name: null,
    // eslint-disable-next-line camelcase
    default_price: null,
    features: [{}]
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
    axiosGetRelatedProductDetails(relatedProductId);
    axiosGetRelatedProductImage(relatedProductId);
  }, [relatedProductId]);

  return (
    <div>
      <div className="image-div">
        <Button variant="outline-dark" onClick={handleShow} style={{ background: "none", color: "black", border: "none", position: "absolute", zIndex: "1" }}>&#9734;</Button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <Modal.Title><h6>Comparing</h6></Modal.Title>
            <h5 style={{ float: "left" }}>Testing</h5>
            <h5 style={{ float: "right" }}>{productDetails.name}</h5>
            <br></br>
            {/* <p style={{ textAlign: "center" }}>{productDetails.features[0].feature}</p> */}
            {productDetails.features[0] !== {} ?
              <ul>
                {productDetails.features.length > 0 ? productDetails.features.map((feature) => {
                  <li style={{ textAlign: "center" }}>{feature.feature}</li>;
                }) : <p></p>}
              </ul>
              : <p></p>}
          </Modal.Body>
        </Modal>
        <img onClick={ handleClick } data-id={ relatedProductId } style={{ position: "relative" }} className="card-image-top" src={productImage.url} alt={productDetails.name} />
      </div>
      <div onClick={ handleClick } data-id={ relatedProductId } className="card-body">
        <div className="card-category">{ productDetails.category }</div>
        <div className="card-name"><strong>{ productDetails.name }</strong></div>
        <div className="card-price">{ '$' + productDetails.default_price }</div>
        {/* <StarComponent productId={ relatedProductId } /> */}
      </div>
    </div>
  );
};

export default RelatedProductCard;

