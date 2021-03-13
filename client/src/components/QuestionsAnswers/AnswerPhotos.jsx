import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AnswerPhotos = ({ photo }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => { setShow(true); };
  const handleClose = () => { setShow(false); };

  return (
    <div className='answer-photos'>
      <img
        className='answer-picture'
        onClick={ handleShow }
        src={ photo.url } >
      </img>
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Body>
          <img
            className='answer-modal-picture'
            src={ photo.url }>
          </img>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnswerPhotos;