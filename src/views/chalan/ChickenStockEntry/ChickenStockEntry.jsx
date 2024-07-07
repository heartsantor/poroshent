import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChickenStockEntry = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">মুরগীর স্টক এন্ট্রি</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <div className="form-group w-100 mb-3">
                  <label htmlFor="datePicker" className="d-block">
                    Select Date
                  </label>
                  <DatePicker
                    id="datePicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control w-100" // Bootstrap form-control class
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group size="sm" className="mb-3">
                  <Form.Label>প্রোডাক্ট সিলেক্ট</Form.Label>
                  <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" as="select">
                    <option>ব্রয়লার প্রি-স্টাটার (Broiler pre-starter)</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product name </Form.Label>
                      <Form.Control type="text" placeholder="Product name" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name (BD) </Form.Label>
                      <Form.Control type="text" placeholder="Product Name (BD)" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group size="sm" className="mb-3">
                      <Form.Label>Bag Size</Form.Label>
                      <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" as="select">
                        <option>25KG</option>
                        <option>50KG</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Supply Unit QTY </Form.Label>
                  <Form.Control type="text" placeholder="Supply Unit QTY" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control type="text" placeholder="Unit Price" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Unit Price</Form.Label>
                  <Form.Control type="text" placeholder="Unit Price " />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Sale Unit Price</Form.Label>
                  <Form.Control type="text" placeholder="Sale Unit Price " />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Chalan NO</Form.Label>
                  <Form.Control type="text" placeholder="Chalan NO " />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Transport No</Form.Label>
                  <Form.Control type="text" placeholder="Transport No" />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>নোট</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Button variant="primary">সংরক্ষণ</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChickenStockEntry;
