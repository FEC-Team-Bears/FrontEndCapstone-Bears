import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const AnswersList = ({ answers }) => {
  const arrayOfAnswers = Object.values(answers);

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