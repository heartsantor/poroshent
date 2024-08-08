import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { toast } from 'react-toastify';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { toastAlert } from '../../../utils/AppHelpers';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';

import { useAllCustomersMutation, useSingleCustomerMutation } from '../../../store/features/customer/customerApi';

const cashOption = [
  {
    value: 1,
    label: 'Cash'
  },
  {
    value: 2,
    label: 'Bkash'
  },
  {
    value: 3,
    label: 'Nagad'
  },
  {
    value: 4,
    label: 'Rocket'
  },
  {
    value: 5,
    label: 'Bank'
  },
  {
    value: 6,
    label: 'Check'
  }
];

const DraftInvoice = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [allCustomers, { isLoading: allCustomersLoading }] = useAllCustomersMutation();
  const [singleCustomers, { isLoading: singleCustomersLoading }] = useSingleCustomerMutation();

  const [startDate, setStartDate] = useState(new Date());
  const [customersData, setCustomersData] = useState([]);
  const [singleCustomersDate, setSingleCustomersDate] = useState({});

  const [selectedOption, setSelectedOption] = useState(null);

  const selectedCustomerData = (customersData || []).map((item) => ({
   value: item.id,
   label: item.primary_phone,
   name: item.name_en,
   note: item.area_en
 }));
 
  const fetchCustomersData = async () => {
    try {
      const res = await allCustomers({ accessToken }).unwrap();
      setCustomersData(res?.Customers || []);
    } catch (error) {
      setCustomersData([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchSingleCustomersData = async (id) => {
    try {
      const res = await singleCustomers({ accessToken, customer_id: id }).unwrap();
      setSingleCustomersDate(res?.customer || {});
    } catch (error) {
      setSingleCustomersDate({});
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (selectedOption) {
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
                  <DatePicker id="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} className="form-control w-100" />
                </div>
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedCustomerData}
                    placeholder="Select One"
                    value={selectedOption}
                    onChange={(selected) => setSelectedOption(selected)}
                    isLoading={allCustomersLoading}
                    header={true}
                    required={true}
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
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control className="floating-input" placeholder="" type="number" size="sm" />
                  <Form.Label className="floating-label">Paid Amount</Form.Label>
                </Form.Group>
              </Col>
              <hr />
              <Col md={6}>
                <Form.Group className=" mb-3">
                  <SmallSelect options={cashOption} placeholder="Account Type" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control className="floating-input" placeholder="" type="text" size="sm" />
                  <Form.Label className="floating-label">Transaction ID</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Received Description</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
              </Col>
            </Row>
            <>
              <Button size="sm" variant="primary" type="submit">
                Submit
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  navigate('/customer/customer-area');
                }}
              >
                cancel
              </Button>
            </>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DraftInvoice;
