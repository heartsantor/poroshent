import React from 'react';
import { Card } from 'react-bootstrap';

import ProductEntryForm from './ProductEntryForm';
import ProductList from './ProductList';

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
