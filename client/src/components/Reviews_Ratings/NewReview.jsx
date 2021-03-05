import React, { useState } from 'react';
import Review from './review.jsx';
import { Modal, Button, Form } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

const NewReview = () => {
  const [show, setShow] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState(0);
  const [width, setWidth] = useState(0)
  const [comfort, setComfort] = useState(0)
  const [quality, setQuality] = useState(0)
  const [length, setLength] = useState(0)
  const [fit, setFit] = useState(0)
  const [recommend, setRecommend] = useState('');
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [fileList, setFileList] = useState({});
  console.log(size, width, comfort, quality, length, fit, recommend, reviewSummary, reviewBody, fileList);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
            <Form.Control value={name} type="text" placeholder="Example: jackson11!" onChange={(e) => { setName(e.target.value) }} />
            <br />
            <Form.Label>What is your Email? </Form.Label>
            <Form.Control value={email} type="email" placeholder="name@example.com" onChange={(e) => { setEmail(e.target.value) }} />
            <br />
            <p>Rate this product.</p>
            <Rating
              name="hover-feedback"
              value={starValue}
              precision={1}
              onChange={(event, newValue) => {
                setStarValue(newValue);
              }} />
            <br />
            <label>Size:</label>
            <select placeholder="select one" value={size} onChange={(e) => { setSize(e.target.value) }}> }
              <option value="">Select Option</option>
              <option value="1">A size too small</option>
              <option value="2">½ a size too small</option>
              <option value="3">Perfect</option>
              <option value="4">½ a size too big</option>
              <option value="5">A size too wide</option>
            </select>
            <br />
            <label>Width:</label>
            <select placeholder="select one" value={width} onChange={(e) => { setWidth(e.target.value) }}>
              <option value="">Select Option</option>
              <option value="1">Too narrow</option>
              <option value="2">Slightly narrow</option>
              <option value="3">Perfect</option>
              <option value="4">Slightly wide</option>
              <option value="5">Too wide</option>
            </select>
            <br />
            <label>Comfort:</label>
            <select placeholder="select one" value={comfort} onChange={(e) => { setComfort(e.target.value) }}>
              <option value="">Select Option</option>
              <option value="1">Uncomfortable</option>
              <option value="2">Slightly uncomfortable</option>
              <option value="3">Ok</option>
              <option value="4">Comfortable</option>
              <option value="5">Perfect</option>
            </select>
            <br />
            <label>Quality:</label>
            <select placeholder="select one" value={quality} onChange={(e) => { setQuality(e.target.value) }}>
              <option value="">Select Option</option>
              <option value="1">Poor</option>
              <option value="2">Below average</option>
              <option value="3">What I expected</option>
              <option value="4">Pretty great</option>
              <option value="5">Perfect</option>
            </select>
            <br />
            <label>Length:</label>
            <select placeholder="select one" value={length} onChange={(e) => { setLength(e.target.value) }}>
              <option value="">Select Option</option>
              <option value="1">Runs Short</option>
              <option value="2">Runs slightly short</option>
              <option value="3">Perfect</option>
              <option value="4">Runs slightly long</option>
              <option value="5">Runs long</option>
            </select>
            <br />
            <label>Fit:</label>
            <select placeholder="select one" value={fit} onChange={(e) => { setFit(e.target.value) }}>
              <option value="">Select Option</option>
              <option value="1">Runs tight</option>
              <option value="2">Runs slightly tight</option>
              <option value="3">Perfect</option>
              <option value="4">Runs slightly long</option>
              <option value="5">Runs long</option>
            </select>
            <br />
            <br />
            <p>Do you recommend this product?</p>
            <input type="radio" name="helpfulness" value="true" onClick={() => { setRecommend(true) }}></input>Yes
            <input type="radio" name="helpfulness" value="false" onClick={() => { setRecommend(false) }}></input>No
            <br />
            <br />
            <Form.Label>Review Summary: </Form.Label>
            <Form.Control value={reviewSummary} type="text" maxLength="60" placeholder="Example: Best purchase ever!"
              onChange={(e) => { setReviewSummary(e.target.value) }} />
            <br />
            <Form.Label>Review:</Form.Label>
            <Form.Control as="textarea" maxLength="1000" minLength="50" rows={3} placeholder="Why did you like the product or not?"
              onChange={(e) => { setReviewBody(e.target.value) }} />
            <label >Upload Pictures:</label>
            <input id="browse" type="file" onChange={() => {previewFiles()}} multiple/>
            <div id="preview"></div>
          </Form>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
          </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default NewReview;



function previewFiles() {

  var preview = document.querySelector('#preview');
  var files   = document.querySelector('input[type=file]').files;

  function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        var image = new Image();
        image.height = 100;
        image.title = file.name;
        image.src = this.result;
        // console.log(image.src)
        preview.appendChild( image );
      }, false);

      reader.readAsDataURL(file);
      // let newPicture = reader.readAsDataURL(file);
      // setFileList(newPicture);
    }

  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }

}