import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { size } from 'lodash';
import { toastAlert } from '../../../utils/AppHelpers';
import ProductEntryForm from './ProductEntryForm';
import ProductList from './ProductList';
import { useGetProductMutation } from '../../../store/features/product/productApi';

const ProductNameEntry = () => {
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
      <ProductList />
    </div>
  );
};

export default ProductNameEntry;
