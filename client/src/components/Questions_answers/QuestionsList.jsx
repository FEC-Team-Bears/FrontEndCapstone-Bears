import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import Question from './Question.jsx';

const QuestionsList = (productId) => {
  // initialize state variables
  // number of questions to be shown
  // list of questions
  const [count, setCount] = useState(4);
  const [questions, setQuestions] = useState([]);

  // useEffect hook to retrieve data from API
  useEffect(() => {
    getAllQuestions();
  }, []);

  // axios request
  const getAllQuestions = (productId) => {
    axios
      // url for a variable productId
      // .get(`https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/questions?product_id=${productId}`)
      // currently hardcoding a productId during development phase
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hratx/qa/questions?product_id=21111', {
        headers: {
          'Authorization': API_KEY
        }
      })
      .then(response => {
        const allQuestions = response.data.results;
        allQuestions.sort((a, b) => {
          (a.question_helpfulness > b.question_helpfulness) ? 1 : (a.question_helpfulness === b.question_helpfulness) ? ((a.question_id > b.question_id) ? 1 : -1 ) : -1;
        });
        setQuestions(allQuestions);
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
      {(questions.length > 2 && questions.slice(0, count).length < questions.length) ? <button onClick={showMoreQuestions}>More Answered Questions</button> : null}
      <button>Add a Question</button>
    </div>
  );
};

export default QuestionsList;