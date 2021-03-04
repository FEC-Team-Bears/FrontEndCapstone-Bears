import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answers_list from './Answers_list.jsx';

const Question = ({ question }) => {
  // initialize state variables / declare variables

  // HTTP requests, hooks, other functions

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      <div>Q: {question.body}</div>
      <div>A: <Answers_list answers={question.answers}/></div>
    </div>
  );
};

export default Question;