import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { size } from 'lodash';

import { toastAlert } from '../../../utils/AppHelpers';

import {
  useAllAreasMutation,
  useCreateAreaMutation,
  useEditAreaMutation,
  useSingleAreaMutation
} from '../../../store/features/area/areaApi';

import CustomerAreaList from './CustomerAreaList';

const CustomerArea = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const { areaId } = useParams();
  const toastId = useRef(null);
  const navigate = useNavigate();

  const [getAllAreas, { isLoading: isAllAreaLoading }] = useAllAreasMutation();
  const [createArea, { isLoading: isCreateLoading }] = useCreateAreaMutation();
  const [editArea, { isLoading: isEditLoading }] = useEditAreaMutation();
  const [getSingleArea, { isLoading: isSingleLoading }] = useSingleAreaMutation();

  const [allAreas, setAllAreas] = useState([]);
  const [mutationData, setMutationData] = useState({
    area_name_bd: '',
    area_name_en: '',
    note: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getSingleArea({ accessToken, area_id: areaId });
        if (response.data.flag === 200) {
          const { data } = response;
          setMutationData({
            area_name_bd: data.data.area_name_bd,
            area_name_en: data.data.area_name_en,
            note: data.data.note
          });
        } else {
          toastAlert('error', response.error);
        }
      } catch (error) {
        console.error('Error:', error);
        toastAlert('error', 'Something went wrong');
      }
    };

    if (areaId) {
      fetchProduct();
    }
  }, [accessToken, areaId, getSingleArea]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss(toastId.current);

    const updatedData = {
      accessToken,
      area_name_bd: mutationData.area_name_bd,
      area_name_en: mutationData.area_name_en,
      note: mutationData.note
    };
    const submitMutation = areaId ? editArea : createArea;
    submitMutation({ ...updatedData, area_id: areaId })
      .unwrap()
      .then((res) => {
        if (size(res)) {
          if (res.flag === 200) {
            toastAlert('success', res.message);
            resetAfterSubmit();
            handleDeleteSuccess();
            if (areaId) {
              navigate('/customer/customer-area');
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

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Customer Area</Card.Title>
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
              <>
                <Button size="sm" variant="primary" type="submit" disabled={isCreateLoading || isEditLoading}>
                  {isCreateLoading || isEditLoading ? 'Saving...' : areaId ? 'Update' : 'Submit'}
                </Button>
                {areaId ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={isCreateLoading || isEditLoading}
                    onClick={() => {
                      navigate('/customer/customer-area');
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
      <CustomerAreaList resData={allAreas} isLoading={isAllAreaLoading} onDeleteSuccess={handleDeleteSuccess} />
    </div>
  );
};

export default CustomerArea;
