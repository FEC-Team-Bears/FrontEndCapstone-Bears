import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import AnswersList from './AnswersList.jsx';
import AnswerForm from './AnswerForm.jsx';

const Question = ({ productId, question, productName }) => {
  const [count, setCount] = useState(question.question_helpfulness);
  const [helpful, setHelpful] = useState(true);

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
    helpful ? (increaseHelpfulness(question.question_id), setHelpful(false)) : null;
  };

  return (
    <div>
      <div>Q: {question.question_body}</div>
      <div onClick={handleClick}>Helpful? <a className='helpful'><u>Yes</u></a>({count})</div>
      <AnswerForm productId={productId} productName={productName} question={question.question_body}/>
      <div>A: <AnswersList questionId={question.question_id}/></div>
    </div>
  );
};

export default Question;