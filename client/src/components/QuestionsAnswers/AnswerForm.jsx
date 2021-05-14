import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const AnswerForm = ({ show, productId, productName, question, handleClose }) => {
  const [validated, setValidated] = useState(false);
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const submitAnswer = () => {
    axios
      .post(`/qa/questions/${question.question_id}/answers`,
        {
          'body': answer,
          'name': nickname,
          'email': email,
          'photos': photos
        })
      .catch(err => {
        console.error('Error: cannot add answer');
      });
  };
  const clearInputFields = () => {
    setAnswer('');
    setNickname('');
    setEmail('');
    setPhotos([]);
  };
  const handleFormClose = () => {
    if (answer.concat(nickname, email) === '' && !photos.length) {
      clearInputFields();
      handleClose();
    } else {
      if (confirm('Are you sure you want to exit? Your changes will not be saved.')) {
        clearInputFields();
        handleClose();
      }
    }
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhotosChange = (e) => {
    setPhotos(currentPhotos => [...currentPhotos, URL.createObjectURL(e.target.files[0])]);
    previewFiles();
  };
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      handleClose();
      submitAnswer();
    }
    setValidated(true);
  };
  const previewFiles = () => {
    var preview = document.querySelector('#preview');
    var files = document.querySelector('input[type=file]').files;
    const readAndPreview = (file) => {
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

  return (
    <div className='answer-form-container'>
      <Modal
        show={ show }
        onHide={ handleFormClose }
        backdrop='static'
        keyboard={ false }
        centered >
        <Modal.Header closeButton>
          <Modal.Title>
            Submit Your Answer<br></br>
            <small><em>{ productName }: { question.question_body }</em></small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><em>All fields marked with a * are mandatory.</em></p>
          <Form
            noValidate
            validated={ validated }
            onSubmit={ handleSubmit } >
            <Form.Group controlId='question'>
              <Form.Label>What is your answer?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as='textarea'
                  placeholder='Write your answer here'
                  maxLength='1000'
                  rows={3}
                  onChange={ handleAnswerChange }
                  required />
                <Form.Control.Feedback type='invalid'>Please enter an answer.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <br />
            <Form.Group controlId='nickname'>
              <Form.Label>What is your nickname?*</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type='text'
                  placeholder='Example: jack543!'
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
            <Form.Label>Upload your photos <small>(max: 5)</small></Form.Label>
            { photos.length < 5
              ? <Form.File id='custom-file'>
                <Form.File.Input type="file" onChange={ handlePhotosChange } />
                { photos.length === 4
                  ? <Form.Text>You can upload 1 more image.</Form.Text>
                  : <Form.Text>You can upload { 5 - photos.length } more images.</Form.Text>
                }
              </Form.File>
              : <Form.Text>You have already uploaded the max number of images.</Form.Text>
            }
            <div id="preview" />
            <br /><br />
            <Button variant='warning' className='review-button-yellow' onClick={ handleFormClose }>Close</Button>{' '}
            <Button variant='primary' type='submit'>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AnswerForm;