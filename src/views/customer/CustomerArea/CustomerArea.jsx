import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import CustomerAreaList from './CustomerAreaList';
const CustomerArea = () => {
  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Customer Area</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Area (EN)</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Area (BD)</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button variant="primary" size="sm">
                  সংরক্ষণ
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <CustomerAreaList />
    </div>
  );
};

export default CustomerArea;
