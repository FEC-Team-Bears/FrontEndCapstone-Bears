import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx';

const Question = ({ question }) => {
  // initialize state variables / declare variables

  // HTTP requests, hooks, other functions

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      <div>Q: {question.question_body}</div>
      <div>A: <AnswersList answers={question.answers}/></div>
    </div>
  );
};

export default Question;