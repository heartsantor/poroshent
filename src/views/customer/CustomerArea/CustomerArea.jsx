import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { size } from 'lodash';

import { toastAlert } from '../../../utils/AppHelpers';

import { useAllAreasMutation } from '../../../store/features/area/areaApi';

import CustomerAreaList from './CustomerAreaList';

const CustomerArea = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const toastId = useRef(null);

  const [getAllAreas, { isLoading: isAreaLoading }] = useAllAreasMutation();

  const [allAreas, setAllAreas] = useState([]);
  const [mutationData, setMutationData] = useState({
    area_name_bd: '',
    area_name_en: '',
    note: ''
  });

  const handleChange = (type, value) => {
    setMutationData((prevData) => ({
      ...prevData,
      [type]: value
    }));
  };

  const resetAfterSubmit = () => {
    setMutationData({
      area_name_bd: '',
      area_name_en: '',
      note: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss(toastId.current);

    const updatedData = {
      accessToken,
      area_name_bd: mutationData.area_name_bd,
      area_name_en: mutationData.area_name_en,
      note: mutationData.note
    };
  };

  // START- fetch all area data

  const fetchAreaData = async () => {
    const data = {
      accessToken: accessToken
    };
    try {
      const res = await getAllAreas(data).unwrap();
      if (size(res)) {
        setAllAreas(res.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteSuccess = () => {
    fetchAreaData();
  };

  useEffect(() => {
    fetchAreaData();
  }, [getAllAreas]);

  // END- fetch all area data

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Customer Area</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder=""
                    className="floating-input"
                    value={mutationData.area_name_en}
                    onChange={(e) => handleChange('area_name_en', e.target.value)}
                  />
                  <Form.Label className="floating-label">Area (EN)</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder=""
                    className="floating-input"
                    value={mutationData.area_name_bd}
                    onChange={(e) => handleChange('area_name_bd', e.target.value)}
                  />
                  <Form.Label className="floating-label">Area (BD)</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>নোট</Form.Label>
                  <Form.Control as="textarea" rows="3" value={mutationData.note} onChange={(e) => handleChange('note', e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Button variant="primary" size="sm" onClick={handleSubmit}>
                  সংরক্ষণ
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <CustomerAreaList resData={allAreas} isLoading={isAreaLoading} onDeleteSuccess={handleDeleteSuccess} />
    </div>
  );
};

export default CustomerArea;
