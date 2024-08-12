import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { size } from 'lodash';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useCreateProductMutation, useEditProductMutation, useGetSingleProductMutation } from '../../../store/features/product/productApi';
import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';

const ProductEntryForm = ({ onDeleteSuccess }) => {
  const { accessToken } = useSelector((state) => state.auth);

  const { productId } = useParams();
  const toastId = useRef(null);
  const navigate = useNavigate();

  const [mutationData, setMutationData] = useState({
    type: '',
    code: '',
    name: '',
    name_en: '',
    category: '',
    check_stock_1: 0,
    check_stock_5: 0,
    check_stock_10: 0,
    check_stock_25: 0,
    check_stock_50: 0,
    note: ''
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
            check_stock_1: data.product.check_stock_1,
            check_stock_5: data.product.check_stock_5,
            check_stock_10: data.product.check_stock_10,
            check_stock_25: data.product.check_stock_25,
            check_stock_50: data.product.check_stock_50,
            note: data.product.note
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
      check_stock_1: null,
      check_stock_5: null,
      check_stock_10: null,
      check_stock_25: null,
      check_stock_50: null,
      note: ''
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
      check_stock_1: mutationData.check_stock_1,
      check_stock_5: mutationData.check_stock_5,
      check_stock_10: mutationData.check_stock_10,
      check_stock_25: mutationData.check_stock_25,
      check_stock_50: mutationData.check_stock_50,
      note: mutationData.note
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
              <Form.Control required as="select" value={mutationData.type} onChange={(e) => handleChange('type', e.target.value)}>
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
                onWheel={(e) => e.target.blur()} 
                inputMode="none"
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
                required
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
                  checked={mutationData.check_stock_1 === 1}
                  onChange={(e) => handleChange('check_stock_1', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="5KG"
                  checked={mutationData.check_stock_5 === 1}
                  onChange={(e) => handleChange('check_stock_5', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="10KG"
                  checked={mutationData.check_stock_10 === 1}
                  onChange={(e) => handleChange('check_stock_10', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="25KG"
                  checked={mutationData.check_stock_25 === 1}
                  onChange={(e) => handleChange('check_stock_25', e.target.checked ? 1 : 0)}
                />
                <Form.Check
                  type="checkbox"
                  label="50KG"
                  checked={mutationData.check_stock_50 === 1}
                  onChange={(e) => handleChange('check_stock_50', e.target.checked ? 1 : 0)}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>নোট</Form.Label>
              <Form.Control as="textarea" rows="3" value={mutationData.note} onChange={(e) => handleChange('note', e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Button size="sm" variant="primary" type="submit" disabled={isLoading || isEditLoading}>
          {isLoading || isEditLoading ? 'Saving...' : productId ? 'Update' : 'Submit'}
        </Button>
        {productId ? (
          <Button
            size="sm"
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
