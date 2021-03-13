import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import API_KEY from '/config.js';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';

const Question = ({ productId, question, productName, answers }) => {
  const [count, setCount] = useState(question.question_helpfulness);
  const [helpful, setHelpful] = useState(true);
  const [show, setShow] = useState(false);
  const [showMoreAnswers, setShowMoreAnswers] = useState(false);
  const [answersCount, setAnswersCount] = useState(2);
  const [allAnswers, setAllAnswers] = useState(Object.values(answers));

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
  const showAnswers = () => {
    if (!showMoreAnswers) {
      setAnswersCount(allAnswers.length);
      setShowMoreAnswers(true);
    } else {
      setAnswersCount(2);
      setShowMoreAnswers(false);
    }
  };
  const handleShow = () => { setShow(true); };
  const handleClose = () => { setShow(false); };

  return (
    <Container className='question-container'>
      <Row className='question-details'>
        <Col md="auto" className='question-text body-color'><h3>Q:</h3></Col>
        <Col className='question-body body-color'><h3>{ question.question_body }</h3></Col>
        <Col md="auto" className='question-helpful clickable-color'>Helpful? <a className='helpful-text' onClick={ handleClick }><u>Yes</u> </a>({ count })</Col>
        <Col md="auto" className='add-answer clickable-color' onClick={ handleShow }><u>Add Answer</u></Col>
      </Row>
      { show
        ? <AnswerForm
          show={ show }
          productId={ productId }
          productName={ productName }
          question={ question }
          handleClose={ handleClose } />
        : null
      }
      <Row>
        <Col md="auto" className='answer-text body-color'><h3>A:</h3></Col>
        <Col>
          <AnswersList questionId={ question.question_id } count= { answersCount } />
        </Col>
      </Row>
      <Row>
        <Col md='auto' className='placeholder'></Col>
        <Col className='toggle-show-answers'>
          { !showMoreAnswers && allAnswers.length > 2
            ? <a onClick={ showAnswers }>Load More Answers</a>
            : (showMoreAnswers && allAnswers.length > 2
              ? <a onClick={ showAnswers }>Collapse Answers</a>
              : null)
          }
        </Col>
      </Row>
    </Container>
  );
};

export default Question;