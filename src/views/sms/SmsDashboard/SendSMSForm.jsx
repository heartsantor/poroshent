import React from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

const SendSMSForm = () => {
  return (
    <div className="send-sms-form">
      <Row>
        <Col md={8}>
          <Form>
            <h5>Send Quick SMS</h5>
            <Form.Group className='mb-3'>
              <Form.Label htmlFor="recipients">Recipients *</Form.Label>
              <Form.Control as="textarea" id="recipients" rows={2} placeholder="Type or Copy paste your number" readOnly>
                01701788017
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="message">Message *</Form.Label>
              <Form.Control as="textarea" id="message" rows={3} />
            </Form.Group>

            <Row className="sms-stats">
              <Col sm="4">
                <Button variant="primary" className="mr-2" size="sm">
                  Send
                </Button>
                <Button variant="secondary" className="mr-2" size="sm">
                  Clear
                </Button>
              </Col>
              <Col sm="8">
                <div className="text-right">
                  <div>Character Count: 0</div>
                  <div>SMS Parts: 0</div>
                  <div>Remaining: 160</div>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={4}>
          <h5>SMS Template</h5>
        </Col>
      </Row>
    </div>
  );
};

export default SendSMSForm;
