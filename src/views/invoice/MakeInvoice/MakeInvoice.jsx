import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const MakeInvoice = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Make Invoice</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <div className="form-group w-100 mb-3">
                  {/* <label htmlFor="datePicker" className="d-block">
                    Select Date
                  </label> */}
                  <DatePicker
                    id="datePicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control w-100" // Bootstrap form-control class
                  />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group size="sm" className="mb-3">
                  <Form.Label>Customer Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="Mobile Number" />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={4}>
                    <Form.Group size="sm" className="mb-3">
                      <Form.Label>Customer Name</Form.Label>
                      <Form.Control type="text" placeholder="Customer Name" />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group size="sm" className="mb-3">
                      <Form.Label>Customer Address</Form.Label>
                      <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" as="select">
                        <option>Nakla</option>
                        <option>Sherpur</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group size="sm" className="mb-3">
                      <Form.Label>Customer Area</Form.Label>
                      <Form.Control type="text" placeholder="Customer Area" />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Product ID </Form.Label>
                  <Form.Control type="text" placeholder="Product ID" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name </Form.Label>
                  <Form.Control type="text" placeholder="Product Name" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Available QTY </Form.Label>
                  <Form.Control type="text" placeholder="Product QTY" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Available Unit </Form.Label>
                  <Form.Control type="text" placeholder="Product Unit" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Selling Price </Form.Label>
                  <Form.Control type="text" placeholder="Product Price" />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary">ADD</Button>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Product Name</th>
                  <th>Product QTY</th>
                  <th>Product Unit</th>
                  <th>Product price</th>
                  <th>Product Total price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Chicken</td>
                  <td>10</td>
                  <td>50KG</td>
                  <td>150</td>
                  <td>1500</td>
                  <td>X remove</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Chicken</td>
                  <td>10</td>
                  <td>50KG</td>
                  <td>150</td>
                  <td>1500</td>
                  <td>X remove</td>
                </tr>
              </tbody>
            </table>
            <div>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control type="text" placeholder="Discount" />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Total price</td>
                        <td>3000</td>
                      </tr>
                      <tr>
                        <td>Total discount</td>
                        <td>100</td>
                      </tr>
                      <tr>
                        <td>after total</td>
                        <td>2900</td>
                      </tr>
                      <tr>
                        <td>given</td>
                        <td>2000</td>
                      </tr>
                      <tr>
                        <td>due</td>
                        <td>900</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Button variant="primary">Submit</Button>
              <Button variant="secondary">Reset</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MakeInvoice;
