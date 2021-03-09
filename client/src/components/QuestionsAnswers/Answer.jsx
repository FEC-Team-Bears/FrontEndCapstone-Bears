import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import API_KEY from '/config.js';

const Answer = ({ answer }) => {
  const [count, setCount] = useState(answer.helpfulness);
  const [helpful, setHelpful] = useState(true);

  const handleHelpful = () => {
    helpful ? (increaseHelpfulness(answer.id), setHelpful(false)) : null;
  };
  const handleReport = (e) => {
    reportAnswer(answer.id);
    e.target.innerHTML = 'Reported';
  };
  const increaseHelpfulness = (answerId) => {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/answers/${answerId}/helpful`,
        {
          data: {
            'answer_id': answerId
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
        console.error('Error: cannot mark answer as helpful');
      });
  };
  const reportAnswer = (answerId) => {
    axios
      .put(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/answers/${answerId}/report`,
        {
          data: {
            'answer_id': answerId
          }
        },
        {
          headers: {
            'Authorization': API_KEY
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
    <div>
      <div> id: {answer.answer_id} {answer.body} </div>
      {answer.answerer_name === 'Seller' ? <div>by <b>{answer.answerer_name}</b>, {moment(answer.date).format('MMMM D, YYYY')}</div> : <div>by {answer.answerer_name}, {moment(answer.date).format('MMMM D, YYYY')}</div>}
      <div onClick={handleHelpful}>Helpful? <a className='helpful'><u>Yes</u></a>({count})</div>
      <div className='report' onClick={handleReport}><u>Report</u></div>
      {/* photos to be added later
      <img>{answer.photos}</img> */}
    </div>
  );
};

export default Answer;