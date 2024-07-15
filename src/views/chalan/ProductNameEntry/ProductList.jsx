import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Spinner, Card } from 'react-bootstrap';
import { size } from 'lodash';

import { useSelector } from 'react-redux';
import { useGetProductMutation } from '../../../store/features/product/productApi';

import ProductTable from './ProductTable';
import ProductEntryForm from './ProductEntryForm';

const ProductList = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getProduct, { isLoading, isError }] = useGetProductMutation();
  const [activeKey, setActiveKey] = useState('1');
  const [products, setProducts] = useState([]);

  const fetchProductData = async (type) => {
    const data = {
      accessToken: accessToken,
      type: type
    };
    try {
      const res = await getProduct(data).unwrap();
      if (size(res)) {
        setProducts(res.product);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteSuccess = () => {
    fetchProductData(activeKey);
  };

  useEffect(() => {
    fetchProductData(activeKey);
  }, [activeKey]);

  const productTableList = isError ? (
    <div>No Data/ Error</div>
  ) : (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <ProductTable productData={products} onDeleteSuccess={handleDeleteSuccess} activeKey={activeKey} />
      )}
    </>
  );
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title as="h5">প্রোডাক্টের নাম এন্ট্রি</Card.Title>
        </Card.Header>
        <Card.Body>
          <ProductEntryForm onDeleteSuccess={handleDeleteSuccess} />
        </Card.Body>
      </Card>

      <h5 className="mt-4">প্রোডাক্ট লিস্ট</h5>
      <hr />
      <Tabs variant="pills" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        <Tab eventKey="1" title="মুরগীর খাবার">
          {productTableList}
        </Tab>
        <Tab eventKey="2" title="মাছের খাবার ">
          {productTableList}
        </Tab>
        <Tab eventKey="3" title="গরুর খাবার">
          {productTableList}
        </Tab>
        <Tab eventKey="4" title="ঔষধ">
          {productTableList}
        </Tab>
      </Tabs>
    </>
  );
};

export default ProductList;
