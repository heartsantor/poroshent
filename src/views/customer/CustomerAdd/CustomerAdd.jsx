import React, { useState, useRef, useEffect } from 'react';
import { size } from 'lodash';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';

import {
  useAllCustomersMutation,
  useCreateCustomerMutation,
  useEditCustomerMutation,
  useSingleCustomerMutation
} from '../../../store/features/customer/customerApi';
import { useAllAreasMutation } from '../../../store/features/area/areaApi';

import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import CustomerTable from './CustomerTable';

const CustomerAdd = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const { customerId } = useParams();
  const toastId = useRef(null);
  const navigate = useNavigate();

  const [getAllAreas, { isLoading: isGetAreasLoading }] = useAllAreasMutation();

  const [getCustomers, { isLoading: isGetLoading, isError }] = useAllCustomersMutation();
  const [createCustomer, { isLoading: isCreateLoading }] = useCreateCustomerMutation();
  const [editCustomer, { isLoading: isEditLoading }] = useEditCustomerMutation();
  const [getSingleCustomer, { isLoading: isSingleLoading }] = useSingleCustomerMutation();

  const [allAreas, setAllAreas] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log('🚀 ~ fetchProduct ~ selectedOption:', selectedOption);
  const [customers, setCustomers] = useState([]);
  const [mutationData, setMutationData] = useState({
    name: '',
    name_en: '',
    address: '',
    area: '',
    primary_phone: '',
    secondary_phone: ''
  });

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const selectedAreasData = (allAreas || []).map((item) => ({
    value: item.id,
    label: item.area_name_bd,
    name: item.area_name_en,
    note: item.note
  }));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getSingleCustomer({ accessToken, customer_id: customerId });
        if (response.data.flag === 200) {
          const { data } = response;

          setMutationData({
            name: data.customer.name,
            name_en: data.customer.name_en,
            address: data.customer.address,
            area: data.customer.area,
            primary_phone: data.customer.primary_phone,
            secondary_phone: data.customer.secondary_phone
          });
          const initialArea = selectedAreasData.find((option) => option.label === data.customer.area);
          setSelectedOption(initialArea);
        } else {
          toastAlert('error', response.error);
        }
      } catch (error) {
        console.error('Error:', error);
        toastAlert('error', 'Something went wrong');
      }
    };

    if (customerId) {
      fetchProduct();
    }
  }, [accessToken, customerId, getSingleCustomer]);

  const handleChange = (type, value) => {
    setMutationData((prevData) => ({
      ...prevData,
      [type]: value
    }));
  };

  const resetAfterSubmit = () => {
    setMutationData({
      name: '',
      name_en: '',
      address: '',
      area: '',
      primary_phone: '',
      secondary_phone: ''
    });
    setSelectedOption(null);
  };

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

  const fetchAreaData = async () => {
    const data = {
      accessToken: accessToken
    };
    try {
      const res = await getAllAreas(data).unwrap();
      if (size(res)) {
        setAllAreas(res.data);
      } else {
        setAllAreas([]);
      }
    } catch (error) {
      setAllAreas([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
    fetchAreaData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss(toastId.current);

    const updatedData = {
      accessToken,
      name: mutationData.name,
      name_en: mutationData.name_en,
      address: mutationData.address,
      area: selectedOption.label,
      primary_phone: mutationData.primary_phone,
      secondary_phone: mutationData.secondary_phone
    };
    const submitMutation = customerId ? editCustomer : createCustomer;
    submitMutation({ ...updatedData, customer_id: customerId })
      .unwrap()
      .then((res) => {
        if (size(res)) {
          if (res.flag === 200) {
            toastAlert('success', res.message);
            resetAfterSubmit();
            handleDeleteSuccess();
            if (customerId) {
              navigate('/customer/customer-add');
            }
          } else {
            toastAlert('error', res.error);
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toastAlert('error', 'Something is wrong');
      });
  };

  const productTableList = isError ? (
    <div>No Data/ Error</div>
  ) : (
    <CustomerTable customerData={customers} onDeleteSuccess={handleDeleteSuccess} isLoading={isGetLoading} />
  );

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Customer</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="form-container">
            {isSingleLoading && (
              <div className="loading-overlay">
                <Spinner animation="border" variant="light" />
              </div>
            )}
            <Form className="form-content" onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <SmallSelect value={selectedOption} onChange={handleSelectChange} options={selectedAreasData} header={true} />
                </Col>
                <Col md={6}>
                  <Form.Group className="floating-label-group mb-3">
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="floating-input"
                      size="sm"
                      value={mutationData.name_en}
                      onChange={(e) => handleChange('name_en', e.target.value)}
                    />
                    <Form.Label className="floating-label">Customer Name (EN) </Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="floating-label-group mb-3">
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="floating-input"
                      size="sm"
                      value={mutationData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                    <Form.Label className="floating-label">Customer Name (BD)</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="floating-input"
                      size="sm"
                      value={mutationData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                    <Form.Label className="floating-label">Customer Address</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="number"
                      placeholder=""
                      className="floating-input"
                      size="sm"
                      value={mutationData.primary_phone}
                      onChange={(e) => handleChange('primary_phone', e.target.value)}
                    />
                    <Form.Label className="floating-label">Primary Phone Number</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="number"
                      placeholder=""
                      className="floating-input"
                      size="sm"
                      value={mutationData.secondary_phone}
                      onChange={(e) => handleChange('secondary_phone', e.target.value)}
                    />
                    <Form.Label className="floating-label">Secondary Phone Number</Form.Label>
                  </Form.Group>
                </Col>
              </Row>
              <>
                <Button size="sm" variant="primary" type="submit" disabled={isCreateLoading || isEditLoading}>
                  {isCreateLoading || isEditLoading ? 'Saving...' : customerId ? 'Update' : 'Submit'}
                </Button>
                {customerId ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={isCreateLoading || isEditLoading}
                    onClick={() => {
                      navigate('/customer/customer-add');
                      resetAfterSubmit();
                    }}
                  >
                    cancel
                  </Button>
                ) : null}
              </>
            </Form>
          </div>
        </Card.Body>
      </Card>
      {productTableList}
      {/* <CustomerTable /> */}
    </div>
  );
};

export default CustomerAdd;
