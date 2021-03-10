
import React, { useState, useEffect } from 'react';
import Review from './review.jsx';
import { Modal, Button, Form } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import $ from 'jquery';
import axios from 'axios';
import API_KEY from '/config.js';

const NewReview = ({ reviews, productId, reviewChar }) => {
  const [show, setShow] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [reviewCharValues, setReviewCharValues] = useState({});
  const [recommend, setRecommend] = useState('');
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let results = {
    'product_id': productId,
    'rating': starValue,
    'summary': reviewSummary,
    'body': reviewBody,
    'recommend': recommend,
    'name': name,
    'email': email,
    'photos': fileList,
    'characteristics': reviewCharValues
  };
  let jsonResults = JSON.stringify(results);

  const axiosPostNewReview = () => {
    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews', jsonResults,
      {
        headers: {
          'Authorization': API_KEY,
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const setNewCharValues = (char, value) => {
    let charValue = reviewChar[char];
    let key = charValue.id;
    let obj = reviewCharValues;

    obj[key] = Number(value);

    setReviewCharValues(obj);
  };

  return (
    <div>
      <Button variant="outline-dark">More Reviews</Button>
      <Button variant="outline-dark" onClick={handleShow}>Add a Review +</Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Write Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>What is your nickname? </Form.Label>
            <Form.Control value={name} type="text" placeholder="Example: jackson11!" onChange={(e) => { setName(e.target.value); }} />
            <br />
            <Form.Label>What is your Email? </Form.Label>
            <Form.Control value={email} type="email" placeholder="name@example.com" onChange={(e) => { setEmail(e.target.value); }} />
            <br />
            <p>Rate this product.</p>
            <Rating
              name="hover-feedback"
              value={starValue}
              precision={1}
              onChange={(event, newValue) => {
                setStarValue(newValue);
              }} />
            {reviewChar.Size ?
              <div>
                <label>Size:</label>
                <select name="Size" placeholder="select one" onChange={(e) => { setNewCharValues('Size', e.target.value); }}>
                  <option value="">Select Option</option>
                  <option value="1">A size too small</option>
                  <option value="2">½ a size too small</option>
                  <option value="3">Perfect</option>
                  <option value="4">½ a size too big</option>
                  <option value="5">A size too wide</option>
                </select>
              </div>
              : null}
            <br />
            {reviewChar.Width ?
              <div>
                <label>Width:</label>
                <select placeholder="select one" onChange={(e) => { setNewCharValues('Width', e.target.value); }}>
                  <option value="">Select Option</option>
                  <option value="1">Too narrow</option>
                  <option value="2">Slightly narrow</option>
                  <option value="3">Perfect</option>
                  <option value="4">Slightly wide</option>
                  <option value="5">Too wide</option>
                </select>
              </div>
              : null}
            <br />
            {reviewChar.Comfort ?
              <div>
                <label>Comfort:</label>
                <select placeholder="select one" onChange={(e) => { setNewCharValues('Comfort', e.target.value); }}>
                  <option value="">Select Option</option>
                  <option value="1">Uncomfortable</option>
                  <option value="2">Slightly uncomfortable</option>
                  <option value="3">Ok</option>
                  <option value="4">Comfortable</option>
                  <option value="5">Perfect</option>
                </select>
              </div>
              : null}
            <br />
            {reviewChar.Quality ?
              <div>
                <label>Quality:</label>
                <select placeholder="select one" onChange={(e) => { setNewCharValues('Quality', e.target.value); }}>
                  <option value="">Select Option</option>
                  <option value="1">Poor</option>
                  <option value="2">Below average</option>
                  <option value="3">What I expected</option>
                  <option value="4">Pretty great</option>
                  <option value="5">Perfect</option>
                </select>
              </div>
              : null}
            <br />
            {reviewChar.Length ?
              <div>
                <label>Length:</label>
                <select placeholder="select one" onChange={(e) => { setNewCharValues('Length', e.target.value); }}>
                  <option value="">Select Option</option>
                  <option value="1">Runs Short</option>
                  <option value="2">Runs slightly short</option>
                  <option value="3">Perfect</option>
                  <option value="4">Runs slightly long</option>
                  <option value="5">Runs long</option>
                </select>
              </div>
              : null}
            <br />
            {reviewChar.Fit ?
              <div>
                <label>Fit:</label>
                <select placeholder="select one" onChange={(e) => { setNewCharValues('Fit', e.target.value); }}>
                  <option value="">Select Option</option>
                  <option value="1">Runs tight</option>
                  <option value="2">Runs slightly tight</option>
                  <option value="3">Perfect</option>
                  <option value="4">Runs slightly long</option>
                  <option value="5">Runs long</option>
                </select>
              </div>
              : null}
            <br />
            <p>Do you recommend this product?</p>
            <input type="radio" name="helpfulness" value="true" onClick={() => { setRecommend(true); }}></input>Yes
            <input type="radio" name="helpfulness" value="false" onClick={() => { setRecommend(false); }}></input>No
            <br />
            <br />
            <Form.Label>Review Summary: </Form.Label>
            <Form.Control value={reviewSummary} type="text" maxLength="60" placeholder="Example: Best purchase ever!"
              onChange={(e) => { setReviewSummary(e.target.value); }} />
            <br />
            <Form.Label>Review:</Form.Label>
            <Form.Control as="textarea" maxLength="1000" minLength="50" rows={3} placeholder="Why did you like the product or not?"
              onChange={(e) => { setReviewBody(e.target.value); }} />
            <label>Upload Pictures:</label>
            <input id="browse" type="file" onChange={() => {
              setFileList(oldArray => [...oldArray, URL.createObjectURL(event.target.files[0])]);
              previewFiles();
            }} multiple />
            <div id="preview"></div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            axiosPostNewReview();
            handleClose();
          }}>

            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewReview;

const previewFiles = () => {
  var preview = document.querySelector('#preview');
  var files = document.querySelector('input[type=file]').files;
  const readAndPreview = (file) => {
    // Make sure `file.name` matches our extensions criteria
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        preview.appendChild(image);
      }, false);
      reader.readAsDataURL(file);
    }
  };
  if (files) {
    [].forEach.call(files, readAndPreview);
  }
};

