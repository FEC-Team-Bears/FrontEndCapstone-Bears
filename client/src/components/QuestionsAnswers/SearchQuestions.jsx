import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const SearchQuestions = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  return (
    <Container className='search-questions-container'>
      <h3 className='qa-heading header-color'>Questions &amp; Answers</h3>
      <input
        className='questions-search-bar'
        type='text'
        placeholder=' Have a question? Search for answers…'
        value={ searchValue }
        onChange = { handleSearchInput } />
      <button className='search-icon'><i className="fa fa-search"></i></button>
    </Container>
  );
};

export default SearchQuestions;