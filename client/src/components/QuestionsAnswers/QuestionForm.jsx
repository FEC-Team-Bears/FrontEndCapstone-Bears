import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import { Modal, Button } from 'react-bootstrap';

const QuestionForm = () => {
  // initialize state variables
  const [show, setShow] = useState(false);

  // HTTP requests, hooks, other functions
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  // return HTML/JSX to be rendered on browser
  return (
    <div>
      {(!length) ? <Button onClick={handleShow}>Submit a New Question</Button> : <Button onClick={handleShow}>Add a Question + </Button>}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ask Your Question</Modal.Title>
        </Modal.Header>
      </Modal>



    </div>
  );
};

export default QuestionForm;