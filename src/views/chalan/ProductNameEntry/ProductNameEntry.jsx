import React from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const ProductNameEntry = () => {
  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Form controls</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>আইটেম সিলেক্ট</Form.Label>
                  <Form.Control as="select">
                    <option>মুরগীর খাবার</option>
                    <option>মাছের খাবার</option>
                    <option>গরুর খাবার</option>
                    <option>ঔষধ</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>আইটেমের নাম (English)</Form.Label>
                  <Form.Control type="text" placeholder="আইটেমের নাম " />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicChecbox">
                  <Form.Label>ব্যাগ সাইজ</Form.Label>
                  <div className="d-flex gap-4">
                    <Form.Check type="checkbox" label="10KG" />
                    <Form.Check type="checkbox" label="25KG" />
                    <Form.Check type="checkbox" label="50KG" />
                  </div>
                </Form.Group>
                <Button variant="primary">সংরক্ষণ</Button>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>আইটেমের কোড </Form.Label>
                  <Form.Control type="text" placeholder="আইটেমের কোড" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>আইটেমের নাম (বাংলা)</Form.Label>
                  <Form.Control type="text" placeholder="আইটেমের নাম " />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>নোট</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductNameEntry;
