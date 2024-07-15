import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { size } from 'lodash';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useCreateProductMutation } from '../../../store/features/product/productApi';
import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';
const ProductEntryForm = ({ onDeleteSuccess }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const toastId = useRef(null);

  const [mutationData, setMutationData] = useState({
    type: '',
    code: '',
    name: '',
    name_en: '',
    category: '',
    stock_1: 0,
    stock_5: 0,
    stock_10: 0,
    stock_25: 0,
    stock_50: 0,
    notes: ''
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const additionalCategoryOptions = {
    2: [
      { value: '', label: 'Select One' },
      { value: 'ভাসমান', label: 'ভাসমান' },
      { value: 'ডুবন্ত', label: 'ডুবন্ত' }
    ]
  };

  const handleChange = (type, value) => {
    if (type === 'fish-category') {
      setMutationData((prevData) => ({
        ...prevData,
        type: value
      }));
    } else {
      setMutationData((prevData) => ({
        ...prevData,
        [type]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss(toastId.current);

    const updatedData = {
      accessToken,
      type: mutationData.type,
      code: mutationData.code,
      name: mutationData.name,
      name_en: mutationData.name_en,
      category: mutationData.category,
      stock_1: mutationData.stock_1 === 1 ? 0 : null,
      stock_5: mutationData.stock_5 === 1 ? 0 : null,
      stock_10: mutationData.stock_10 === 1 ? 0 : null,
      stock_25: mutationData.stock_25 === 1 ? 0 : null,
      stock_50: mutationData.stock_50 === 1 ? 0 : null
    };

    if (updatedData.type !== '' && updatedData.code) {
      createProduct(updatedData)
        .unwrap()
        .then((res) => {
          if (size(res)) {
            if (res.flag === 200) {
              toastAlert('success', res.message);
              onDeleteSuccess(); // Refetch product data after successful deletion
            } else {
              toastAlert('error', res.error);
            }
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toastAlert('error', 'Something is wrong');
        });
    }
  };

  return (
    <>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>আইটেম সিলেক্ট</Form.Label>
              <Form.Control as="select" value={mutationData.type} onChange={(e) => handleChange('fish-category', e.target.value)}>
                <option value="">Select One</option>
                <option value="1">মুরগীর খাবার</option>
                <option value="2">মাছের খাবার</option>
                <option value="3">গরুর খাবার</option>
                <option value="4">ঔষধ</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {mutationData.type === '2' && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>অতিরিক্ত ক্যাটাগরি</Form.Label>
                <Form.Control
                  as="select"
                  value={mutationData.additionalCategory}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {additionalCategoryOptions['2'].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          )}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>আইটেমের কোড</Form.Label>
              <Form.Control
                type="text"
                placeholder="আইটেমের কোড"
                value={mutationData.code}
                onChange={(e) => handleChange('code', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>আইটেমের নাম (English)</Form.Label>
              <Form.Control
                type="text"
                placeholder="আইটেমের নাম"
                value={mutationData.name_en}
                onChange={(e) => handleChange('name_en', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>আইটেমের নাম (বাংলা)</Form.Label>
              <Form.Control
                type="text"
                placeholder="আইটেমের নাম"
                value={mutationData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>ব্যাগ সাইজ</Form.Label>
              <div className="d-flex gap-4">
                <Form.Check
                  type="checkbox"
                  label="1KG"
                  checked={mutationData.stock_1 === 1}
                  onChange={(e) => handleChange('stock_1', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="5KG"
                  checked={mutationData.stock_5 === 1}
                  onChange={(e) => handleChange('stock_5', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="10KG"
                  checked={mutationData.stock_10 === 1}
                  onChange={(e) => handleChange('stock_10', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="25KG"
                  checked={mutationData.stock_25 === 1}
                  onChange={(e) => handleChange('stock_25', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="50KG"
                  checked={mutationData.stock_50 === 1}
                  onChange={(e) => handleChange('stock_50', e.target.checked ? 1 : 0)}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>নোট</Form.Label>
              <Form.Control as="textarea" rows="3" value={mutationData.notes} onChange={(e) => handleChange('notes', e.target.value)} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Button onClick={handleSubmit} disabled={isLoading} type="submit" variant="primary">
              {isLoading ? 'Saving' : 'Save'}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProductEntryForm;
