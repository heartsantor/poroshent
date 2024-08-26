import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';

import { IconMessage, IconReload, IconSettings } from '../../../assets/icon';

const radios = [
  { name: 'grameenphone', value: '0' },
  { name: 'banglalink', value: '1' },
  { name: 'teletalk', value: '2' }
];

const SmsBalance = () => {
  const [radioValue, setRadioValue] = useState('0');
  return (
    <div>
      <Card>
        <Card.Body className="p-0">
          {/* <h4 className="mb-4">getItemName</h4> */}
          <div className="shadow-sm">
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex text-info">
                <h5 className="mb-0 me-2">Banglalink</h5>
                <div style={{ cursor: 'pointer' }}>
                  <IconReload isLoading={true} />
                </div>
              </div>
              <div>
                <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className="toggle-button"
                      key={idx}
                      id={`radiosms-b-${idx}`}
                      type="radio"
                      size="sm"
                      variant={radioValue === radio.value ? 'primary' : 'light'}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <div className="text-info" style={{ cursor: 'pointer' }}>
                <IconSettings />
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center px-3 py-3">
            <div className="col-6">
              <div className="d-flex align-items-center">
                <div
                  className="me-2 bg-info rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px' }}
                >
                  <span className="text-white display-5">৳</span>
                </div>
                <div>
                  <p className="m-0">Balance</p>
                  <h3 className="f-w-600 d-flex align-items-center m-b-0">0 TK</h3>
                </div>
              </div>
            </div>
            <div className="col-6 text-end">
              <div className="d-flex align-items-start justify-content-end">
                <div className="">
                  <h4 className="f-w-600 m-b-0">
                    <span>500</span>SMS
                  </h4>
                  <p className="m-0">Any LocalNumber</p>
                  <p className="m-0">Valid till 06 Sep 11:59PM</p>
                </div>
                <div className="ms-2">
                  <IconMessage />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 d-flex align-items-center"></div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SmsBalance;
