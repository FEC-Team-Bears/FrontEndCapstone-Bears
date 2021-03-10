import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import API_KEY from '/config.js';

const RelatedProductCard = ({ relatedProductId, handleClick, mainProductDetails }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productImage, getProductImage] = useState({});
  const [productDetails, getProductDetails] = useState({
    category: null,
    name: null,
    // eslint-disable-next-line camelcase
    default_price: null,
    features: [{}]
  });

  useEffect(() => {
    axiosGetRelatedProductDetails(relatedProductId);
    axiosGetRelatedProductImage(relatedProductId);
  }, [relatedProductId]);

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

  const comparisonTable = {};

  return (
    <div>
      <div className="image-div">

        <Button variant="outline-dark" onClick={handleShow} style={{ background: 'none', color: 'black', border: 'none', position: 'absolute', zIndex: '1' }}>&#9734;</Button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <Modal.Title><h6>Comparing</h6></Modal.Title>
            <table className="relatedProductsTable" >
              <thead>
                <tr>
                  <th scope="col">{mainProductDetails.name}</th>
                  <th scope="col"> </th>
                  <th scope="col">{productDetails.name}</th>
                </tr>
              </thead>
              <tbody>
                {mainProductDetails.features.map(feature => {
                  comparisonTable[feature.feature] = 1;
                  return (
                    <tr>
                      <td>{ feature.value }</td>
                      <td>{ feature.feature }</td>
                      { productDetails.features.map(relatedProduct => {
                        if (relatedProduct.feature === feature.feature) {
                          return <td>{relatedProduct.value}</td>;
                        }
                      }) }
                    </tr>
                  );
                })}
                {productDetails.features.map(feature => {
                  if (comparisonTable[feature.feature] === undefined) {
                    return (
                      <tr>
                        <td></td>
                        <td>{feature.feature}</td>
                        <td>{feature.value}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </Modal.Body>
        </Modal>
        <img onClick={ handleClick } data-id={ relatedProductId } style={{ position: 'relative' }} className="card-image-top" src={productImage.url} alt={productDetails.name} />

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
