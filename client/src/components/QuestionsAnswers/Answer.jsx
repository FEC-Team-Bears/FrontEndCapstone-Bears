import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Answer = ({ answer }) => {
  // initialize state / declare variables

  // HTTP requests, hooks, other functions

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      <div>{answer.body}</div>
      <div>by {answer.answerer_name}, {answer.date}</div>
      <a>Helpful? Yes({answer.helpfulness})</a>
      {/* <img>{answer.photos}</img> */}
    </div>
  );
};

export default Answer;