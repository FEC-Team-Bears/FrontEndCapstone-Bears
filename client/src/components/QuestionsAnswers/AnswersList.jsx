import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import API_KEY from '/config.js';

const AnswersList = ({ questionId, newAnswer }) => {
  const [count, setCount] = useState(2);
  const [show, setShow] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const showAnswers = () => {
    if (!show) {
      setCount(allAnswers.length);
      setShow(true);
    } else {
      setCount(2);
      setShow(false);
    }
  };

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
    <div>
      {allAnswers.slice(0, count).map(answer => (
        <Answer key={ answer.answer_id } answer={ answer } />
      ))}
      {!show && allAnswers.length > 2
        ? <button onClick={ showAnswers }>Load More Answers</button>
        : (show && allAnswers.length > 2
          ? <button onClick={ showAnswers }>Collapse Answers</button>
          : null)
      }
    </div>
  );
};

export default AnswersList;