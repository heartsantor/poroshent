import React from 'react';
import { Row, Col, Card, Table, Tabs, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomerTable = () => {
  return (
    <div>
      <Table responsive hover className="recent-users">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Customer Name (বাংলা)</th>
            <th>address</th>
            <th>area</th>
            <th>primary_phone</th>
            <th>secondary_phone</th>
            <th>highest_discount</th>
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
              <p className="m-0">chicken</p>
            </td>
            <td>
              <p className="m-0">none</p>
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

export default CustomerTable;
