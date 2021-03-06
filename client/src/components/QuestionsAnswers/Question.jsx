import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import AnswersList from './AnswersList.jsx';

const Question = ({ question }) => {
  const [count, setCount] = useState(question.question_helpfulness);
  const [helpful, setHelpful] = useState(true);

  const handleClick = () => {
    (helpful) ? (increaseHelpfulness(question.question_id), setHelpful(false)) : null;
  };
  const increaseHelpfulness = (questionId) => {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/questions/${questionId}/helpful`,
        {
          data: {
            'question_id': questionId
          }
        },
        {
          headers: {
            'Authorization': API_KEY
          }
        })
      .then(response => {
        setCount(count + 1);
      })
      .catch(err => {
        console.log('Error: cannot mark question as helpful');
      });
  };

  return (
    <div>
      <div>Q: {question.question_body}</div>
      <a id='helpful' onClick={handleClick}>Helpful? <u>Yes</u>({count})</a>
      <button>Add Answer</button>
      <div>A: <AnswersList answers={question.answers}/></div>
    </div>
  );
};

export default Question;