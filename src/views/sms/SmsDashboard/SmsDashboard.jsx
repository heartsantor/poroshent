import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';

import SmsStatus from './SmsStatus';
import SmsBalance from './SmsBalance';
import SendSMSForm from './SendSMSForm';
import SmsDraft from './SmsDraft';

const radios = [
  { name: 'My Own SMS', value: '0' },
  { name: 'bulksmsbd', value: '1' }
];

const SmsDashboard = () => {
  const ws = useRef(null);

  const [radioValue, setRadioValue] = useState('0');

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Draft Invoice</Card.Title>
        </Card.Header>
        <Card.Body>
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                className="toggle-button"
                key={idx}
                id={`radiosms-${idx}`}
                type="radio"
                size="lg"
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
          <hr />
          <Row>
            <Col md={6}>
              <SmsStatus />
            </Col>
            <Col md={6}>
              <SmsBalance />
            </Col>
          </Row>
          <SendSMSForm />
          {/* <SmsDraft /> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SmsDashboard;
