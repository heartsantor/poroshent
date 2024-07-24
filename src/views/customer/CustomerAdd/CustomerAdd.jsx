import React, { useState, useEffect } from 'react';
import { size } from 'lodash';

import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAllCustomersMutation } from '../../../store/features/customer/customerApi';

import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import CustomerTable from './CustomerTable';

const CustomerAdd = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getCustomers, { isLoading, isError }] = useAllCustomersMutation();
  const [customers, setCustomers] = useState([]);
  console.log('🚀 ~ CustomerAdd ~ customers:', customers);

  const fetchCustomerData = async () => {
    const data = {
      accessToken: accessToken
    };
    try {
      const res = await getCustomers(data).unwrap();
      if (size(res)) {
        setCustomers(res.Customers);
      }
    } catch (error) {
      setCustomers([]);
      console.error('Error:', error);
    }
  };

  const handleDeleteSuccess = () => {
    fetchCustomerData();
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const productTableList = isError ? (
    <div>No Data/ Error</div>
  ) : (
    <>
      <CustomerTable customerData={customers} onDeleteSuccess={handleDeleteSuccess} isLoading={isLoading} />
    </>
  );

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
                <SmallSelect />
                {/* <Form.Group className="mb-3">
                  <Form.Control as="select" size="sm">
                    <option>dhaka</option>
                    <option>sherpur</option>
                    <option>nakla</option>
                  </Form.Control>
                </Form.Group> */}
              </Col>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control type="text" placeholder="" className="floating-input" size="sm" />
                  <Form.Label className="floating-label">Customer Name </Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="text" placeholder="" className="floating-input" size="sm" />
                  <Form.Label className="floating-label">Customer Address</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="number" placeholder="" className="floating-input" size="sm" />
                  <Form.Label className="floating-label">Primary Phone Number</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="number" placeholder="" className="floating-input" size="sm" />
                  <Form.Label className="floating-label">Secondary Phone Number</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button size="sm" variant="primary">
                  সংরক্ষণ
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {productTableList}
      {/* <CustomerTable /> */}
    </div>
  );
};

export default CustomerAdd;
