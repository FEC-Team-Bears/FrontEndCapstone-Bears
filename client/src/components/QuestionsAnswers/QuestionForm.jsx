import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const QuestionForm = ({ productId, show, productName, handleNewQuestion, handleClose }) => {
  // const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const submitQuestion = () => {
    axios
      .post('/qa/questions',
        {
          'product_id': productId,
          'body': question,
          'name': nickname,
          'email': email
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
        console.error('Error: cannot add question');
      });
  };

  const clearInputFields = () => {
    setQuestion('');
    setNickname('');
    setEmail('');
  };
  const handleFormClose = () => {
    if (question.concat(nickname, email) === '') {
      handleClose();
    } else if (confirm('Are you sure you want to exit? Your changes will not be saved.')) {
      clearInputFields();
      handleClose();
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

  return (
    <div className='question-form-container'>
      <Modal
        show={ show }
        onHide={ handleFormClose }
        backdrop='static'
        keyboard={ false }
        centered >
        <Modal.Header closeButton>
          <Modal.Title>
            Ask Your Question<br></br>
            <small><em>About the { productName }</em></small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><em>All fields marked with a * are mandatory.</em></p>
          <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <Form.Group controlId='question'>
              <Form.Label>What is your question?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as='textarea'
                  placeholder='Write your question here'
                  maxLength='1000'
                  rows={3}
                  onChange={ handleQuestionChange }
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
                  onChange={ handleNicknameChange }
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
                  onChange={ handleEmailChange }
                  required />
                <Form.Control.Feedback type='invalid'>Please provide a valid email format.</Form.Control.Feedback>
              </InputGroup>
              <Form.Text>For authentication reasons, you will not be emailed.</Form.Text>
            </Form.Group>
            <Button variant='danger' onClick={ handleFormClose }>Close</Button>{' '}
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default QuestionForm;