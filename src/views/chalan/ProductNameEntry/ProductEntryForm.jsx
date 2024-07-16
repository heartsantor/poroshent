import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { size } from 'lodash';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useCreateProductMutation, useEditProductMutation, useGetSingleProductMutation } from '../../../store/features/product/productApi';
import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';

const ProductEntryForm = ({ onDeleteSuccess }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

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
  const [editProduct, { isLoading: isEditLoading }] = useEditProductMutation();
  const [getSingleProduct, { isLoading: isSingleProductLoading }] = useGetSingleProductMutation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getSingleProduct({ accessToken, product_id: productId });
        if (response.data.flag === 200) {
          const { data } = response;
          setMutationData({
            type: data.product.type,
            code: data.product.code,
            name: data.product.name,
            name_en: data.product.name_en,
            category: data.product.category,
            stock_1: data.product.stock_1 === null ? 0 : 1,
            stock_5: data.product.stock_5 === null ? 0 : 1,
            stock_10: data.product.stock_10 === null ? 0 : 1,
            stock_25: data.product.stock_25 === null ? 0 : 1,
            stock_50: data.product.stock_50 === null ? 0 : 1,
            notes: data.product.notes
          });
        } else {
          toastAlert('error', response.error);
        }
      } catch (error) {
        console.error('Error:', error);
        toastAlert('error', 'Something went wrong');
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [accessToken, productId, getSingleProduct]);

  const handleChange = (type, value) => {
    setMutationData((prevData) => ({
      ...prevData,
      [type]: value
    }));
  };

  const resetAfterSubmit = () => {
    setMutationData({
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
      stock_50: mutationData.stock_50 === 1 ? 0 : null,
      notes: mutationData.notes
    };

    const submitMutation = productId ? editProduct : createProduct;

    submitMutation({ ...updatedData, product_id: productId })
      .unwrap()
      .then((res) => {
        if (size(res)) {
          if (res.flag === 200) {
            toastAlert('success', res.message);
            resetAfterSubmit();
            onDeleteSuccess(); // Refetch product data after successful deletion
            if (productId) {
              navigate('/chalan/product-name-entry');
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
    <div className="form-container">
      {isSingleProductLoading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <Form className="form-content" onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>আইটেম সিলেক্ট</Form.Label>
              <Form.Control as="select" value={mutationData.type} onChange={(e) => handleChange('type', e.target.value)}>
                <option value="">Select One</option>
                <option value="1">মুরগীর খাবার</option>
                <option value="2">মাছের খাবার</option>
                <option value="3">গরুর খাবার</option>
                <option value="4">ঔষধ</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {(mutationData.type === '2' || mutationData.type === 2) && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>অতিরিক্ত ক্যাটাগরি</Form.Label>
                <Form.Control as="select" value={mutationData.category} onChange={(e) => handleChange('category', e.target.value)}>
                  <option value="">Select One</option>
                  <option value="ভাসমান">ভাসমান</option>
                  <option value="ডুবন্ত">ডুবন্ত</option>
                </Form.Control>
              </Form.Group>
            </Col>
          )}
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>আইটেমের কোড</Form.Label>
              <Form.Control
                type="number"
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
        </Row>
        <Button variant="primary" type="submit" disabled={isLoading || isEditLoading}>
          {isLoading || isEditLoading ? 'Saving...' : productId ? 'Update' : 'Submit'}
        </Button>
        {productId ? (
          <Button
            variant="secondary"
            disabled={isLoading || isEditLoading}
            onClick={() => {
              navigate('/chalan/product-name-entry');
              resetAfterSubmit();
            }}
          >
            cancel
          </Button>
        ) : null}
      </Form>
    </div>
  );
};

export default ProductEntryForm;
