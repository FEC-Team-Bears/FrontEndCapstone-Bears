import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import API_KEY from '/config.js';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';

const Question = ({ productId, question, productName }) => {
  const [count, setCount] = useState(question.question_helpfulness);
  const [helpful, setHelpful] = useState(true);
  const [show, setShow] = useState(false);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const increaseHelpfulness = (questionId) => {
    axios
      .put(`qa/questions/${questionId}/helpful`,
        {
          data: {
            'question_id': questionId
          }
        })
      .then(response => {
        setCount(count + 1);
      })
      .catch(err => {
        console.error('Error: cannot mark question as helpful');
      });
  };
  const handleClick = () => {
    helpful
      ? (increaseHelpfulness(question.question_id), setHelpful(false))
      : alert('You have already marked this question as "helpful".');
  };

  const handleShow = () => { setShow(true); };
  const handleClose = () => { setShow(false); };


  return (
    <Container className='question-container'>
      <Row className='question-details'>
        <Col md="auto" className='question-text'>Q: </Col>
        <Col className='question-body'>{ question.question_body }</Col>
        <Col md="auto" className='question-helpful'>Helpful? <a className='helpful-text' onClick={ handleClick }><u>Yes</u> </a>({ count })</Col>
        <Col md="auto" className='add-answer' onClick={ handleShow }><u>Add Answer</u></Col>
      </Row>
      {show
        ? <AnswerForm
          show={ show }
          productId={ productId }
          productName={ productName }
          question={ question.question_body }
          handleClose={ handleClose } />
        : null
      }
      <Row className='answers-container'>
        <Col md="auto" className='answer-text'>A:</Col>
        <Col md="auto">
          <AnswersList questionId={ question.question_id } />
        </Col>
      </Row>
    </Container>
  );
};

export default Question;