import React from 'react';
import { Row, Col, Card, Table, Tabs, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductTable = () => {
  return (
    <div>
      <Table responsive hover className="recent-users">
        <thead>
          <tr>
            <th>#</th>
            <th>আইটেমের নাম (English)</th>
            <th>আইটেমের নাম (বাংলা)</th>
            <th>আইটেমের কোড</th>
            <th>আইটেম টাইপ</th>
            <th>ব্যাগ সাইজ</th>
            <th>নোট</th>
            <th>অ্যাকশন </th>
          </tr>
        </thead>
        <tbody>
          <tr className="unread">
            <td>1</td>
            <td>
              <p className="m-0">Broiler pre-starter</p>
            </td>
            <td>
              <p className="m-0">ব্রয়লার প্রি-স্টাটার</p>
            </td>
            <td>
              <p className="m-0">11221</p>
            </td>
            <td>
              <p className="m-0">chicken</p>
            </td>
            <td>
              <div className="d-flex gap-2">
                <h5>
                  <Badge bg="secondary">10KG</Badge>
                </h5>
                <h5>
                  <Badge bg="secondary">25KG</Badge>
                </h5>
                <h5>
                  <Badge bg="secondary">50KG</Badge>
                </h5>
              </div>
            </td>
            <td>
              <p className="m-0">none</p>
            </td>
            <td>
              <Link to="#" className="label theme-bg text-white f-12">
                এডিট
              </Link>
              <Link to="#" className="label theme-bg2 text-white f-12">
                ডিলিট
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
