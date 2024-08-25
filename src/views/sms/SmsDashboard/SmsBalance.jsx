import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

import { IconMessage, IconReload, IconSettings } from '../../../assets/icon';
const SmsBalance = () => {
  return (
    <div>
      <Card>
        <Card.Body className="p-4">
          {/* <h4 className="mb-4">getItemName</h4> */}
          <div className="d-flex align-items-center justify-content-between px-3 pb-2">
            <div className="d-flex text-info">
              <h5 className="me-2">Banglalink</h5>
              <div style={{ cursor: 'pointer' }}>
                <IconReload isLoading={true} />
              </div>
            </div>
            <div className="text-info" style={{ cursor: 'pointer' }}>
              <IconSettings />
            </div>
          </div>
          <div className="row d-flex align-items-center">
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
