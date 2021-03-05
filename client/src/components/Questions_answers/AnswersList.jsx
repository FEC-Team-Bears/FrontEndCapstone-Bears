import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const AnswersList = ({ answers }) => {
  // initialize state / declare variables
  const arrayOfAnswers = Object.values(answers);

  // HTTP requests, hooks, other functions

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      {arrayOfAnswers.map(answer => {
        return (
          <Answer key={answer.id} answer={answer} />
        );
      })}
    </div>
  );
};

export default AnswersList;