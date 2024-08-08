import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toBengaliWords } from '../../utils/toBengaliWords';

const CustomerInfo = () => {
  return (
    <div className="card-container">
      <div className="left-section">
        <div className="header">
          <div className="user-info">
            <h5>_ _ _ _ _ _ _ _ _ _</h5>
            <span>_ _ _ _ _ _ _ _ _ _</span>
          </div>
          <div className="action-buttons">
            <Button variant="light">Write</Button>
          </div>
        </div>
        <ul className="skills-list">
          <li>
            <span>Name</span>
            <span>_ _ _ _ _ _ _ _ _ _ </span>
          </li>
          <li>
            <span>primary Number</span>
            <span>_ _ _ _ _ _ _ _ _ _</span>
          </li>
          <li>
            <span>Secondary Number</span>
            <span>_ _ _ _ _ _ _ _ _ _</span>
          </li>
          <li>
            <span>Area</span>
            <span>_ _ _ _ _ _ _ _ _ _</span>
          </li>
          <li>
            <span>Address</span>
            <span>_ _ _ _ _ _ _ _ _ _</span>
          </li>
        </ul>
      </div>
      <div className="right-section">
        <div className="total-due-card">
          <h5>Total Due</h5>
          <span>: _ _ _ taka</span>
        </div>
        <table className="overview-table mt-3">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Total price</th>
              <th>paid</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total price</td>
              <td>discount</td>
              <td>After discount</td>
              <td className="text-bold color-red">paidAmount </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerInfo;
