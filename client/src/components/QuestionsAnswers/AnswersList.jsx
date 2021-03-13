import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import API_KEY from '/config.js';
import Answer from './Answer.jsx';

const AnswersList = ({ questionId, newAnswer, count }) => {
  const [allAnswers, setAllAnswers] = useState([]);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const getAnswers = () => {
    axios
      .get(`/qa/questions/${questionId}/answers?page=1&count=100`)
      .then(response => {
        const sortedAnswers = response.data.results.sort((a, b) => {
          if (a.answerer_name === 'Seller' && b.answerer_name !== 'Seller') {
            return -1;
          } else if (a.answerer_name !== 'Seller' && b.answerer_name === 'Seller') {
            return 1;
          } else {
            if (a.helpfulness > b.helpfulness) {
              return -1;
            } else if (a.helpfulness < b.helpfulness) {
              return 1;
            } else {
              if (a.answer_id > b.answer_id) {
                return -1;
              } else {
                return 1;
              }
            }
          }
        });
        setAllAnswers(sortedAnswers);
      })
      .catch(err => {
        console.error('Error: Cannot retrieve answers from API');
      });
  };

  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <div className='answers-list-container'>
      <Container className='answers-container'>
        { allAnswers.length
          ? allAnswers.slice(0, count).map(answer => (
            <Answer key={ answer.answer_id } answer={ answer } />
          ))
          : <div className='no-answers body-color'><em>No answers have been submitted for this question.</em></div>
        }
      </Container>
    </div>
  );
};

export default AnswersList;