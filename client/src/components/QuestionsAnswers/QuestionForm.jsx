import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const QuestionForm = ({ productId, length, handleNewQuestion }) => {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState('');
  const [validated, setValidated] = useState(false);
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const getProductName = () => {
    axios
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products/${productId}`, {
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
  const submitQuestion = () => {
    axios
      .post('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/questions',
        {
          'product_id': productId,
          'body': question,
          'name': nickname,
          'email': email
        },
        {
          headers: {
            'Authorization': API_KEY
          }
        })
      .then(response => {
        const newQuestion = [{
          'question_id': null,
          'question_body': question,
          'question_date': null,
          'asker_name': nickname,
          'question_helpfulness': 0,
          'reported': false,
          'answers': {},
        }];
        handleNewQuestion(newQuestion);
      })
      .catch(err => {
        console.log('Error: cannot add question');
      });
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    if (question.concat(nickname, email) === '') {
      setShow(false);
    } else if (confirm('Are you sure you want to exit? Your changes will not be saved.')) {
      setShow(false);
    }
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
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      setShow(false);
      submitQuestion();
    }
    setValidated(true);
  };

  useEffect(() => {
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
                  as='textarea'
                  placeholder='Write your question here'
                  maxLength='1000'
                  rows={3}
                  onChange={handleQuestionChange}
                  required />
                <Form.Control.Feedback type='invalid'>Please enter a question.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <br />
            <Form.Group controlId='nickname'>
              <Form.Label>What is your nickname?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='text'
                  placeholder='Example: jackson11!'
                  maxLength='60'
                  onChange={handleNicknameChange}
                  required />
                <Form.Control.Feedback type='invalid'>Please enter a username.</Form.Control.Feedback>
              </InputGroup>
              <Form.Text>For privacy reasons, do not use your full name or email address.</Form.Text>
            </Form.Group>
            <br />
            <Form.Group controlId='email'>
              <Form.Label>What is your email?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='email'
                  placeholder='Example: jack@email.com'
                  maxLength='60'
                  onChange={handleEmailChange}
                  required />
                <Form.Control.Feedback type='invalid'>Please provide a valid email format.</Form.Control.Feedback>
              </InputGroup>
              <Form.Text>For authentication reasons, you will not be emailed.</Form.Text>
            </Form.Group>
            <Button variant='danger' onClick={handleClose}>Close</Button>{' '}
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QuestionForm;