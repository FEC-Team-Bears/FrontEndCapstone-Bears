import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import API_KEY from '/config.js';

import AnswerPhotos from './AnswerPhotos.jsx';

const Answer = ({ answer }) => {
  const [count, setCount] = useState(answer.helpfulness);
  const [helpful, setHelpful] = useState(true);
  const [reported, setReported] = useState(false);
  const [show, setShow] = useState(false);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const handleHelpful = () => {
    helpful
      ? (increaseHelpfulness(answer.answer_id), setHelpful(false))
      : alert('You have already marked this answer as "helpful".');
  };
  const handleReport = (e) => {
    if (!reported) {
      reportAnswer(answer.answer_id);
      e.target.innerHTML = 'Reported';
      setReported(true);
    } else {
      alert(`You have already reported the following answer: "${answer.body}"`);
    }
  };
  const increaseHelpfulness = (answerId) => {
    axios
      .put(`/qa/answers/${answerId}/helpful`,
        {
          data: {
            'answer_id': answerId
          }
        })
      .then(response => {
        setCount(count + 1);
      })
      .catch(err => {
        console.error('Error: cannot mark answer as helpful');
      });
  };
  const reportAnswer = (answerId) => {
    axios
      .put(`/qa/answers/${answerId}/report`,
        {
          data: {
            'answer_id': answerId
          }
        })
      .then(response => {
        alert(`You have reported the following answer: "${answer.body}"`);
      })
      .catch(err => {
        console.error('Error: cannot report answer');
      });
  };

  return (
    <Container className='answer-container'>
      <Row className='answer-body body-color'>
        <Col><h5>{ answer.body }</h5></Col>
      </Row>
      <Row className='answer-details'>
        { answer.answerer_name === 'Seller'
          ? <Col md="auto" className='answer-username'>by <b>{ answer.answerer_name }</b>, { moment(answer.date).format('MMMM D, YYYY') }</Col>
          : <Col md="auto" className='answer-username'>by { answer.answerer_name }, { moment(answer.date).format('MMMM D, YYYY') }</Col>
        }
        <Col md="auto" className='answer-helpful clickable-color'>Helpful? <a className='helpful-text' onClick={ handleHelpful }><u>Yes</u> </a>({ count })</Col>
        <Col md="auto" className='answer-report clickable-color'><a onClick={ handleReport }><u>Report</u></a></Col>
      </Row>
      { answer.photos.length !== 0
        ? answer.photos.map(photo => (
          <AnswerPhotos key={ photo.id } photo={ photo } />
        ))
        : null
      }
    </Container>
  );
};

export default Answer;