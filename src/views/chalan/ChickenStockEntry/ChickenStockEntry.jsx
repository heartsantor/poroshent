import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Row, Col, Card, Form, Button, ButtonGroup, ToggleButton, DropdownButton, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { Chicken } from '../../../assets/icon';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import { useGetProductMutation } from '../../../store/features/product/productApi';

const ChickenStockEntry = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getProduct, { isLoading: allProductLoading }] = useGetProductMutation();
  const [startDate, setStartDate] = useState(new Date());

  const [radioValue, setRadioValue] = useState('1');
  const [selectedOption, setSelectedOption] = useState(null);

  const [products, setProducts] = useState([]);
  console.log('🚀 ~ ChickenStockEntry ~ products:', products);
  const selectedProductData = (products || []).map((item) => ({
    value: item.id,
    label: item.name
  }));

  const radios = [
    { icon: <Chicken />, name: 'মুরগীর খাবার', value: '1' },
    { icon: <Chicken />, name: 'মাছের খাবার', value: '2' },
    { icon: <Chicken />, name: 'গরুর খাবার', value: '3' },
    { icon: <Chicken />, name: 'ঔষধ', value: '4' }
  ];

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    console.log('Selected option:', selected);
  };

  const fetchProductData = async (type) => {
    const data = {
      accessToken: accessToken,
      type: type
    };
    try {
      const res = await getProduct(data).unwrap();
      if (size(res)) {
        setProducts(res.product);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProductData(radioValue);
  }, [radioValue]);

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
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedProductData}
                    placeholder="Select One"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isLoading={allProductLoading}
                  />
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
                  {/* <Col md={4}>
                    <Form.Group className="mb-3">
                      <SmallSelect options={options} placeholder="Select One" value={selectedOption} onChange={handleSelectChange} />
                    </Form.Group>
                  </Col> */}
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Supply Unit QTY </Form.Label>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Unit Price</Form.Label>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Unit Price</Form.Label>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Sale Unit Price</Form.Label>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Chalan NO</Form.Label>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control size="sm" type="text" placeholder="" className="floating-input" />
                  <Form.Label className="floating-label">Transport No</Form.Label>
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
