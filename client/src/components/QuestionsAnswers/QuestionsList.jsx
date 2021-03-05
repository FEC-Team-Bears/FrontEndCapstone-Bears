import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import Question from './Question.jsx';
import QuestionForm from './QuestionForm.jsx';

const QuestionsList = ({productId}) => {
  const [count, setCount] = useState(4);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [remainingQ, setRemainingQ] = useState(true);
  // const [form, setForm] = useState(false);

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    if (count > questions.length) {
      getAllQuestions();
    }
  }, [count]);

  const getAllQuestions = (productId) => {
    axios
      // url for a variable productId
      // .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/questions?product_id=${productId}&page=${page}`)
      // currently hardcoding a productId during development phase
      .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/questions?product_id=21111&page=${page}`, {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(response => {
        if (response.data.results.length !== 0) {
          const allQuestions = questions.concat(response.data.results);
          allQuestions.sort((a, b) => {
            (a.question_helpfulness > b.question_helpfulness) ? 1 : (a.question_helpfulness === b.question_helpfulness) ? ((a.question_id > b.question_id) ? 1 : -1 ) : -1;
          });
          setQuestions(allQuestions);
          setPage(page + 1);
        } else {
          setRemainingQ(false);
        }
      })
      .catch(err => {
        console.log('Error: Cannot retrieve questions from API');
      });
  };

  const showMoreQuestions = () => {
    setCount(count + 2);
  };

  return (
    <div>
      {(questions.length !== 0) ? questions.slice(0, count).map(question => (
        <Question key={question.question_id} question={question}/>
      )) : null}
      {(questions.length > 2 && remainingQ) ? <button onClick={showMoreQuestions}>More Answered Questions</button> : null}
      <QuestionForm productId={productId} length={questions.length}/>
    </div>
  );
};

export default QuestionsList;