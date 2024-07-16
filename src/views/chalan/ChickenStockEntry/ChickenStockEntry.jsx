import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, ButtonGroup, ToggleButton, DropdownButton, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Chicken } from '../../../assets/icon';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
const ChickenStockEntry = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { icon: <Chicken />, name: 'মুরগীর খাবার', value: '1' },
    { icon: <Chicken />, name: 'মাছের খাবার', value: '2' },
    { icon: <Chicken />, name: 'গরুর খাবার', value: '3' },
    { icon: <Chicken />, name: 'ঔষধ', value: '4' }
  ];

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

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
                  <DatePicker id="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} className="form-control w-100" />
                </div>
              </Col>
            </Row>
            <ButtonGroup className="mb-3">
              {radios.map((radio, idx) => (
                <ToggleButton
                  size="sm"
                  key={idx}
                  id={`radi-${idx}`}
                  type="radio"
                  variant="outline-secondary"
                  name="aa"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {/* {radio.icon} */}
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3 floating-label-group">
                  <Form.Control size="sm" as="select" className="floating-select">
                    <option value="" hidden>
                      Select One
                    </option>
                    <option>ব্রয়লার প্রি-স্টাটার (Broiler pre-starter)</option>
                    <option>ব্রয়লার প্রি-স্টাটার (Broiler pre-starter2)</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="floating-label-group mb-3">
                      <Form.Control name="product-name" size="sm" type="text" placeholder="" className="floating-input" />
                      <Form.Label name="product-name" className="floating-label">
                        Product name
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="floating-label-group mb-3 ">
                      <Form.Control name="product-name-bd" size="sm" type="text" placeholder="" className="floating-input" />
                      <Form.Label name="product-name-bd" className="floating-label">
                        Product Name (BD)
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <SmallSelect options={options} placeholder="Select One" />
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
            </Row>
            <Button variant="primary">সংরক্ষণ</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChickenStockEntry;
