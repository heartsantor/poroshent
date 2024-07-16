import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const NetworkWarningModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Modal.Body className="network-warning-modal">
        <div className="network-warning-content">
          <h4>Network Error</h4>
          <p>Please check your network connection and try again.</p>
          {/* <Button variant="secondary" onClick={onHide}>
            Close
          </Button> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

NetworkWarningModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default NetworkWarningModal;
