import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WarningModal = ({ show, handleClose, handleConfirm, title, body, isLoading }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button disabled={isLoading} variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningModal;
