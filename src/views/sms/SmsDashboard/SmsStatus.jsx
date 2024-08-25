import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

import { IconMessage, IconReload, IconSettings } from '../../../assets/icon';

const SmsStatus = () => {
  return (
    <div>
      <Card>
        <Card.Body className="p-4">
          {/* <h4 className="mb-4">getItemName</h4> */}
          <div className="d-flex align-items-center justify-content-between px-3 pb-2">
            <div className="d-flex text-info align-items-center">
              <div className="d-flex align-items-center">
                <span style={{ width: '10px', height: '10px' }} className="bg-success rounded-circle me-2"></span>
                <h5 className="m-0">Active</h5>
              </div>
              <div className="ms-2" style={{ cursor: 'pointer' }}>
                <IconReload />
              </div>
            </div>
            <div className="text-info" style={{ cursor: 'pointer' }}>
              <IconSettings />
            </div>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-12">
              <div className="ms-2">
                <div className="rounded-2 bg-info px-2 py-0 text-white fw-bold mb-2" style={{ maxWidth: '100px',textAlign:"center" }}>
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
    </div>
  );
};

export default SmsStatus;
