import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Answer = ({ answer }) => {
  return (
    <div>
      <div>{answer.body}</div>
      <div>by {answer.answerer_name}, {answer.date}</div>
      <a>Helpful? Yes({answer.helpfulness})</a>
      {/* photos to be added later
      <img>{answer.photos}</img> */}
    </div>
  );
};

export default Answer;