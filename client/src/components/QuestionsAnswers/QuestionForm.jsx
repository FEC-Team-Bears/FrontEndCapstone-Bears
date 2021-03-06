import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const QuestionForm = ({ productId, length }) => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState('');
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValdity() === false) {
      e.preventDefault();
    }
    setValidated(true);
    // submit axios request
  };

  const getProductName = (productId) => {
    axios
      // url for a variable productId
      // .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products?product_id=${productId}`)
      // currently hardcoding a productId during development phase:
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/21113', {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(response => {
        setProduct(response.data.name);
      })
      .catch(err => {
        console.log('Error: cannot retrieve product information');
      });
  };

  useEffect(() => {
    // for a variable productId, use the following:
    // getProductName(productId);
    getProductName();
  }, []);


  return (
    <div>
      {(!length) ? <Button onClick={handleShow}>Submit a New Question</Button> : <Button onClick={handleShow}>Add a Question + </Button>}

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Ask Your Question<br></br>
            <small><em>About the {product}</em></small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><em>All fields marked with a * are mandatory.</em></p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId='question'>
              <Form.Label>What is your question?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  as='textarea'
                  placeholder='Write your question here'
                  maxLength='1000'
                  rows={3}
                  onChange={handleQuestionChange} />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <br />
            <Form.Group controlId='nickname'>
              <Form.Label>What is your nickname?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type='text'
                  placeholder='Example: jackson11!'
                  maxLength='60'
                  onChange={handleNicknameChange} />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
              <Form.Text>For privacy reasons, do not use your full name or email address.</Form.Text>
            </Form.Group>
            <br />
            <Form.Group controlId='email'>
              <Form.Label>What is your email?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type='email'
                  placeholder='Example: jack@email.com'
                  maxLength='60'
                  onChange={handleEmailChange} />
                <Form.Control.Feedback type='invalid'>Please provide a valid email format.</Form.Control.Feedback>
              </InputGroup>
              <Form.Text>For authentication reasons, you will not be emailed.</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type='submit'>Submit</Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
};

export default QuestionForm;