import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const Answers_list = ({ answers }) => {
  // initialize state / declare variables
  const arrayOfAnswers = Object.values(answers);

  // HTTP requests, hooks, other functions

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      {arrayOfAnswers.map(answer => {
        return (
          <Answer key={answer.id} name={answer.answerer_name} body={answer.body} date={answer.date} helpfulness={answer.helpfulness} photos={answer.photos} />
        );
      })}
    </div>
  );
};

export default Answers_list;