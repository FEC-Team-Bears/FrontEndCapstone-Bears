import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '/config.js';
import { Modal, Button } from 'react-bootstrap';

const QuestionForm = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

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