import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';

import { IconMessage, IconReload, IconSettings } from '../../../assets/icon';

import SmsConfigModal from '../../../components/Modal/SmsConfigModal';

const radios = [
  { name: 'Local Server', value: '0' },
  { name: 'Cloud Server', value: '1' }
];

const SmsStatus = () => {
  const [radioValue, setRadioValue] = useState('0');

  const [showModal, setShowModal] = useState(true);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Card>
        <Card.Body className="p-0">
          {/* <h4 className="mb-4">getItemName</h4> */}
          <div className="shadow-sm">
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex text-info align-items-center">
                <div className="d-flex align-items-center">
                  <span style={{ width: '10px', height: '10px' }} className="bg-success rounded-circle me-2"></span>
                  <h5 className="m-0">Active</h5>
                </div>
                <div className="ms-2" style={{ cursor: 'pointer' }}>
                  <IconReload />
                </div>
              </div>
              <div>
                <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className="toggle-button"
                      key={idx}
                      id={`radiosms-s-${idx}`}
                      type="radio"
                      size="sm"
                      variant={radioValue === radio.value ? 'primary' : 'light'}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                      // disabled={true}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <div className="text-info" style={{ cursor: 'pointer' }} onClick={handleShow}>
                <IconSettings />
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center px-3 py-3">
            <div className="col-12">
              <div className="ms-2">
                <div className="rounded-2 bg-info px-2 py-0 text-white fw-bold mb-2" style={{ maxWidth: '100px', textAlign: 'center' }}>
                  SIM 1
                </div>
                <p className="m-0">
                  <span className="d-inline-block fw-bold ">Id: </span>
                  <span className="text-warning">Hlww</span>
                </p>
                <p className="m-0">
                  <span className="d-inline-block fw-bold ">Device Name: </span> <span className="text-warning">Hlww</span>
                </p>
                <p className="m-0">
                  <span className="d-inline-block fw-bold ">Last Seen: </span> <span className="text-warning">Hlww</span>
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <SmsConfigModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default SmsStatus;
