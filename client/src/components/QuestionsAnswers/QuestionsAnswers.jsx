import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import QuestionsList from './QuestionsList.jsx';
import SearchQuestions from './SearchQuestions.jsx';

const QuestionsAnswers = ({ productId }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div className='questions-answers-container'>
      <SearchQuestions handleSearch={ handleSearch } />
      <QuestionsList productId={ productId } searchValue={ searchValue }/>
    </div>
  );
};

export default QuestionsAnswers;
