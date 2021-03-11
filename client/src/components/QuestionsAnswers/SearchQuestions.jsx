import React, { useState, useEffect } from 'react';

const SearchQuestions = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);


  return (
    <div>
      <label htmlFor='search'></label>
      <input
        type='text'
        placeholder='Have a question? Search for answers…'
        value={ searchValue }
        onChange = { handleSearchInput } />
    </div>
  );
};

export default SearchQuestions;