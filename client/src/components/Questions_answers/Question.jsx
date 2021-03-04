import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Answers_list from './Answers_list.jsx';

const Question = ({ body, answers }) => {
  // initialize state variables / declare variables

  // HTTP requests, hooks, other functions

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      <div>Q: {body}</div>
      <div>A: <Answers_list answers={answers}/></div>
    </div>
  );
};

export default Question;