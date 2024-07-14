import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Spinner } from 'react-bootstrap';
import { size } from 'lodash';
import ProductTable from './ProductTable';

const ProductList = ({ productData, getProduct, accessToken, isLoading }) => {
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

  useEffect(() => {
    fetchProductData(activeKey);
  }, [activeKey]);

  return (
    <>
      <h5 className="mt-4">প্রোডাক্ট লিস্ট</h5>
      <hr />
      <Tabs variant="pills" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        <Tab eventKey="1" title="মুরগীর খাবার">
          {isLoading ? <Spinner animation="border" variant="primary" /> : <ProductTable productData={products} />}
        </Tab>
        <Tab eventKey="2" title="মাছের খাবার ">
          {isLoading ? <Spinner animation="border" variant="primary" /> : <ProductTable productData={products} />}
        </Tab>
        <Tab eventKey="3" title="গরুর খাবার">
          {isLoading ? <Spinner animation="border" variant="primary" /> : <ProductTable productData={products} />}
        </Tab>
        <Tab eventKey="4" title="ঔষধ">
          {isLoading ? <Spinner animation="border" variant="primary" /> : <ProductTable productData={products} />}
        </Tab>
      </Tabs>
    </>
  );
};

export default ProductList;
