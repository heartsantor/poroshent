import React from 'react';
import { Row, Col, Tabs, Tab, Nav } from 'react-bootstrap';
import ProductTable from './ProductTable';
const ProductList = () => {
  return (
    <div>
      <h5 className="mt-4">প্রোডাক্ট লিস্ট</h5>
      <hr />
      <Tabs variant="pills" defaultActiveKey="home" className="mb-3">
        <Tab eventKey="home" title="মুরগীর খাবার">
          <ProductTable />
        </Tab>
        <Tab eventKey="profile" title="মাছের খাবার ">
          <ProductTable />
        </Tab>
        <Tab eventKey="contact" title="গরুর খাবার">
          <ProductTable />
        </Tab>
        <Tab eventKey="contact2" title="ঔষধ">
          <ProductTable />
        </Tab>
        <Tab eventKey="contact3" title="সকল">
          <ProductTable />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductList;
