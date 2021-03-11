import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import API_KEY from '/config.js';

const Answer = ({ answer }) => {
  const [count, setCount] = useState(answer.helpfulness);
  const [helpful, setHelpful] = useState(true);
  const [reported, setReported] = useState(false);
  const [show, setShow] = useState(false);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
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
    <div>
      <div>{ answer.body }</div>
      { answer.answerer_name === 'Seller'
        ? <div>by <b>{ answer.answerer_name }</b>, { moment(answer.date).format('MMMM D, YYYY') }</div>
        : <div>by { answer.answerer_name }, { moment(answer.date).format('MMMM D, YYYY') }</div>
      }
      <div onClick={ handleHelpful }>Helpful? <a className='helpful'><u>Yes</u></a>({ count })</div>
      <div className='report' onClick={handleReport}><u>Report</u></div>
      { answer.photos.length !== 0
        ? answer.photos.map(photo => (
          <div key={ photo.id } className='answer-photos'>
            <img
              onClick={ handleShow }
              src={ photo.url }
              width={58}
              height={80}>
            </img>
            <Modal show={ show } onHide={ handleClose }>
              <Modal.Body>
                <img
                  src={ photo.url }
                  width={465}
                  height={700}>
                </img>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))
        : null
      }
    </div>
  );
};

export default Answer;