import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import Question from './Question.jsx';

const Questions_list = (productId) => {
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
  const getAllQuestions = () => {
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
        setQuestions(allQuestions);
      })
      .catch(err => {
        console.log('Error: Cannot retrieve questions from API');
      });
  };

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      {questions.map(question => (
        <Question key={question.question_id} body={question.question_body} answers={question.answers}/>
      ))}
    </div>
  );
};

export default Questions_list;