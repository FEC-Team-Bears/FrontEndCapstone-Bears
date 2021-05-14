import React, { useState } from 'react';
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
