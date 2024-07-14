import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { size } from 'lodash';
import { toastAlert } from '../../../utils/AppHelpers';
import ProductEntryForm from './ProductEntryForm';
import ProductList from './ProductList';
import { useGetProductMutation } from '../../../store/features/product/productApi';

const ProductNameEntry = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [productData, setProductData] = useState([]);
  const [getProduct, { isLoading }] = useGetProductMutation();

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        accessToken: accessToken,
        type: 1
      };
      try {
        const res = await getProduct(data).unwrap();
        if (size(res)) {
          setProductData(res.product);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [accessToken, getProduct]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">প্রোডাক্টের নাম এন্ট্রি</Card.Title>
        </Card.Header>
        <Card.Body>
          <ProductEntryForm />
        </Card.Body>
      </Card>
      <ProductList productData={productData} getProduct={getProduct} accessToken={accessToken} isLoading={isLoading} />
    </div>
  );
};

export default ProductNameEntry;
