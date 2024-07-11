import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import CustomerTable from './CustomerTable';
const CustomerAdd = () => {
  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Customer</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Area Select</Form.Label>
                  <Form.Control as="select">
                    <option>dhaka</option>
                    <option>sherpur</option>
                    <option>nakla</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer Name </Form.Label>
                  <Form.Control type="text" placeholder="Customer Name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Customer Address</Form.Label>
                  <Form.Control type="text" placeholder="Customer Address " />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Primary Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Primary Phone Number" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Secondary Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Secondary Phone Number" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Button variant="primary">সংরক্ষণ</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <CustomerTable />
    </div>
  );
};

export default CustomerAdd;
