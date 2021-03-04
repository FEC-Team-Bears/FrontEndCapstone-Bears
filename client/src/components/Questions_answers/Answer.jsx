import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Answer = ({ name, body, date, helpfulness, photos }) => {
  // initialize state / declare variables

  // HTTP requests, hooks, other functions

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      <div>{body}</div>
      <div>by {name}, {date}</div>
      <a>Helpful? Yes({helpfulness})</a>
    </div>
  );
};