import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import Question from './Question.jsx';
import QuestionForm from './QuestionForm.jsx';

const QuestionsList = ({ productId, searchValue }) => {
  const [count, setCount] = useState(4);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [remainingQ, setRemainingQ] = useState(true);
  const [product, setProduct] = useState('');
  const [filteredQ, setFilteredQ] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx';
  axios.defaults.headers.common['Authorization'] = API_KEY;

  const getAllQuestions = (currentPage = page, currentQuestions = questions) => {
    axios
      .get(`/qa/questions?product_id=${productId}&page=${currentPage}&count=97`)
      .then(response => {
        if (response.data.results.length < count || response.data.results.length === 0) {
          setRemainingQ(false);
        } else {
          const allQuestions = currentQuestions.concat(response.data.results);
          setQuestions(allQuestions);
          setPage(page + 1);
        }
      })
      .catch(err => {
        console.error('Error: Cannot retrieve questions from API');
      });
  };
  const getProductName = () => {
    axios
      .get(`/products/${productId}`)
      .then(response => {
        setProduct(response.data.name);
      })
      .catch(err => {
        console.error('Error: cannot retrieve product information');
      });
  };

  const showMoreQuestions = () => {
    setCount(count + 2);
  };
  const handleNewQuestion = (newQuestion) => {
    const allQuestions = newQuestion.concat(questions);
    setQuestions(allQuestions);
  };

  useEffect(() => {
    getAllQuestions(1, []);
  }, [productId]);
  useEffect(() => {
    if (count >= questions.length) {
      getAllQuestions();
    }
  }, [count]);
  useEffect(() => {
    getProductName();
  }, []);
  useEffect(() => {
    if (searchValue.length) {
      if (searchValue.length > 2) {
        const allQuestions = questions.filter(question => (
          question.question_body.includes(searchValue)
        ));
        setFilteredQ(allQuestions);
        setIsFiltered(true);
      } else {
        setFilteredQ([]);
        setIsFiltered(false);
      }
    } else {
      setFilteredQ([]);
      setIsFiltered(false);
    }
  }, [searchValue]);

  return (
    <div>
      { isFiltered && filteredQ.length
        ? filteredQ.slice(0, count).map(question => (
          <Question
            key={ question.question_id }
            question={ question }
            productName={ product } />
        ))
        : isFiltered && !filteredQ.length
          ? <div>No questions with that search criteria can be found.</div>
          : questions.length && !filteredQ.length && !isFiltered
            ? questions.slice(0, count).map(question => (
              <Question
                key={ question.question_id }
                question={ question }
                productName={ product } />
            ))
            : null
      }
      { questions.length > 2 && remainingQ
        ? <button onClick={ showMoreQuestions }>More Answered Questions</button>
        : null
      }
      <QuestionForm
        productId={ productId }
        length={ questions.length }
        handleNewQuestion={ handleNewQuestion } />
    </div>
  );
};

export default QuestionsList;