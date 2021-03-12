import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import API_KEY from '/config.js';
import StarRating from '../ReviewsRatings/StarRating.jsx';

const RelatedProductCard = ({ relatedProductId, handleClick, mainProductDetails, reviews, related }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productImage, getProductImage] = useState({});
  const [relatedReviews, getRelatedReviews] = useState([]);
  const [productDetails, getProductDetails] = useState({
    'category': null,
    'name': null,
    'default_price': null,
    'features': [{}]
  });

  useEffect(() => {
    axiosGetRelatedProductDetails(relatedProductId);
    axiosGetRelatedProductImage(relatedProductId);
    axiosGetRelatedReviews(relatedProductId);
  }, [relatedProductId]);

  const axiosGetRelatedProductDetails = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${relatedProductId}`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(product => getProductDetails(product.data))
      .catch(error => console.error(error));
  };

  const axiosGetRelatedProductImage = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${relatedProductId}/styles`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(product => getProductImage(product.data.results[0].photos[0]))
      .catch(error => console.error(error));
  };

  const axiosGetRelatedReviews = () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews', {
      headers: {
        'Authorization': API_KEY
      },
      params: {
        'product_id': `${relatedProductId}`
      }
    })
      .then(reviews => getRelatedReviews(reviews.data.results))
      .catch(error => console.error(error));
  };

  const removeFromYourOutfit = (e) => {
    let oldOutfit = {};
    if (JSON.parse(localStorage.getItem('yourOutfit'))) {
      oldOutfit = JSON.parse(localStorage.getItem('yourOutfit'));
      delete oldOutfit[relatedProductId];
    }
    localStorage.setItem('yourOutfit', JSON.stringify(oldOutfit));
    $(e.target.parentNode.parentNode.parentNode).hide();
  };

  const comparisonTable = {};

  return (
    <div>
      <div className="image-div">
        {related ?
          <Button variant="outline-dark" onClick={handleShow} style={{ background: 'none', color: '#FCCD04', border: 'none', position: 'absolute', zIndex: '1' }}>&#9734;</Button>
          : <Button onClick={ removeFromYourOutfit } style={{ background: 'none', color: '#17E9E0', border: 'none', position: 'absolute', zIndex: '1' }}>X</Button>}
        {related ?
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
              <Modal.Title><h6>Comparing</h6></Modal.Title>
              <table className="relatedProductsTable" style={{ tableLayout: 'fixed', width: '100%' }} >
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: 'left', width: '33%' }}>{mainProductDetails.name}</th>
                    <th scope="col" style={{ width: '33%' }}> </th>
                    <th scope="col" style={{ textAlign: 'right', width: '33%' }}>{productDetails.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {mainProductDetails.features.map(feature => {
                    comparisonTable[feature.feature] = 1;
                    return (
                      <tr>
                        <td>{ feature.value }</td>
                        <td style={{ textAlign: 'center' }} >{ feature.feature }</td>
                        { productDetails.features.map(relatedProduct => {
                          if (relatedProduct.feature === feature.feature) {
                            return <td style={{ textAlign: 'right' }}>{relatedProduct.value}</td>;
                          }
                        })}
                      </tr>
                    );
                  })}
                  {productDetails.features.map(feature => {
                    if (comparisonTable[feature.feature] === undefined) {
                      return (
                        <tr>
                          <td></td>
                          <td style={{ textAlign: 'center' }} >{feature.feature}</td>
                          <td style={{ textAlign: 'right' }} >{feature.value}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>
          : null
        }
        <img
          onClick={ related ? handleClick : null }
          data-id={ relatedProductId }
          style={{ position: 'relative' }}
          className="card-image-top"
          src={productImage.url ? productImage.url : 'https://i.kym-cdn.com/photos/images/facebook/001/415/781/1ca.jpg'}
          alt={productDetails.name} />
      </div>
      <div onClick={ related ? handleClick : null } data-id={ relatedProductId } className="card-body">
        <div className="card-category">{ productDetails.category }</div>
        <div className="card-name"><strong>{ productDetails.name }</strong></div>
        <div className="card-price">{ '$' + productDetails.default_price }</div>
        {relatedReviews.length > 0 ? <StarRating reviews={ relatedReviews } /> : null}
      </div>
    </div>
  );
};

export default RelatedProductCard;

