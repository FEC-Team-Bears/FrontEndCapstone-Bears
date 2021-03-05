import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


const ReviewPhotos = ({photo}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="review-photos-container">
      <a variant="primary" onClick={handleShow}><img src={photo.url} width={58} height={80}></img></a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body><img src={photo.url} width={465} height={700}></img></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviewPhotos;

