import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import Question from './Question.jsx';

const QuestionsList = ({productId}) => {
  // initialize state variables
  const [count, setCount] = useState(4);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [remainingQ, setRemainingQ] = useState(true);

  // useEffect hooks to retrieve data from API
  useEffect(() => {
    getAllQuestions();
  }, []);
  useEffect(() => {
    if (count > questions.length) {
      getAllQuestions();
    }
  }, [count]);

  // axios request
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

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      {(questions.length === 0) ? <button>Submit a New Question</button> : questions.slice(0, count).map(question => (
        <Question key={question.question_id} question={question}/>
      ))}
      {(questions.length > 2 && remainingQ) ? <button onClick={showMoreQuestions}>More Answered Questions</button> : null}
      {(questions.length !== 0) ? <button>Add a Question</button> : null}
    </div>
  );
};

export default QuestionsList;