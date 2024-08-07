import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';

import { useAllCustomersMutation, useSingleCustomerMutation } from '../../../store/features/customer/customerApi';
import { useGetProductMutation } from '../../../store/features/product/productApi';

const MakeInvoice = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const [getProduct, { isLoading: allProductLoading }] = useGetProductMutation();
  const [allCustomers, { isLoading: allCustomersLoading }] = useAllCustomersMutation();
  const [singleCustomers, { isLoading: singleCustomersLoading }] = useSingleCustomerMutation();

  const [startDate, setStartDate] = useState(new Date());

  const [products, setProducts] = useState([]);
  console.log('🚀 ~ MakeInvoice ~ products:', products);
  const [customersDate, setCustomersDate] = useState([]);
  const [singleCustomersDate, setSingleCustomersDate] = useState({});

  // from singleCustomersDate get data
  //   {
  //     "id": 7,
  //     "name": "Molla BD",
  //     "name_en": "Molla",
  //     "address": "ashulia",
  //     "area": "চন্দ্রকোনা",
  //     "primary_phone": "01799111111",
  //     "secondary_phone": "",
  //     "credit": -5693
  // }

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedProductOption, setSelectedProductOption] = useState(null);

  const selectedCustomerData = (customersDate || []).map((item) => ({
    value: item.id,
    label: item.primary_phone,
    name: item.name_en,
    note: item.area
  }));

  const selectedProductData = (products || []).map((item) => ({
    value: item.id,
    label: item.name_en,
    name: item.name,
    note: `Total: ${item.stock_1 + item.stock_5 + item.stock_10 + item.stock_25 + item.stock_50} bag`
  }));
  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };
  const handleProductSelectChange = (selected) => {
    setSelectedProductOption(selected);
  };

  const fetchProductData = async () => {
    const data = {
      accessToken: accessToken
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
    fetchProductData();
  }, []);

  const fetchCustomersData = async () => {
    const data = {
      accessToken: accessToken
    };
    try {
      const res = await allCustomers(data).unwrap();
      if (size(res)) {
        setCustomersDate(res.Customers);
      } else {
        setCustomersDate([]);
      }
    } catch (error) {
      setCustomersDate([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchSingleCustomersData = async (id) => {
    const data = {
      accessToken: accessToken,
      customer_id: id
    };
    try {
      const res = await singleCustomers(data).unwrap();
      if (size(res)) {
        setSingleCustomersDate(res.customer);
      } else {
        setSingleCustomersDate([]);
      }
    } catch (error) {
      setSingleCustomersDate([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (selectedOption !== null) {
      fetchSingleCustomersData(selectedOption.value);
    }
  }, [selectedOption]);

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

                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedCustomerData}
                    placeholder="Select One"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isLoading={allCustomersLoading}
                    header={true}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={6}>
                    name: {singleCustomersDate.name}
                    <h6>due: {singleCustomersDate.credit}</h6>
                  </Col>
                  <Col md={6}>address: {singleCustomersDate.address}</Col>
                </Row>
              </Col>
            </Row>

            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedProductData}
                    placeholder="Select One"
                    value={selectedProductOption}
                    onChange={handleProductSelectChange}
                    isLoading={allProductLoading}
                  />
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
