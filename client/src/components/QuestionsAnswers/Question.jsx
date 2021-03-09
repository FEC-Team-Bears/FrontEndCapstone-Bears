import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import AnswersList from './AnswersList.jsx';

const Question = ({ question }) => {
  const [count, setCount] = useState(question.question_helpfulness);
  const [helpful, setHelpful] = useState(true);

  const handleClick = () => {
    helpful ? (increaseHelpfulness(question.question_id), setHelpful(false)) : null;
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
        console.error('Error: cannot mark question as helpful');
      });
  };

  return (
    <div>
      <div>Q: {question.question_body}</div>
      <div onClick={handleClick}>Helpful? <a className='helpful'><u>Yes</u></a>({count})</div>
      <button>Add Answer</button>
      <div>A: <AnswersList questionId={question.question_id}/></div>
    </div>
  );
};

export default Question;