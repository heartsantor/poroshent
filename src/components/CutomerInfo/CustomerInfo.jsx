import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { toBengaliWords } from '../../utils/toBengaliWords';

const CustomerInfo = ({ customersDate, customersDueDate }) => {
  return (
    <div className="card-container">
      <div className="left-section">
        <div className="header">
          <div className="user-info">
            <h5>{customersDate?.name_en ? customersDate?.name_en : '_ _ _ _ _ _ _ _ _ _'}</h5>
            <span>{customersDate?.primary_phone ? customersDate?.primary_phone : '_ _ _ _ _ _ _ _ _ _'}</span>
          </div>
          <div className="action-buttons">
            <Button variant="light">Write</Button>
          </div>
        </div>
        <ul className="skills-list">
          <li>
            <span>Name</span>
            <span>{customersDate?.name ? `${customersDate?.name} (${customersDate?.name_en})` : '_ _ _ _ _ _ _ _ _ _'}</span>
          </li>
          <li>
            <span>primary Number</span>
            <span>
              <span>{customersDate?.primary_phone ? customersDate?.primary_phone : '_ _ _ _ _ _ _ _ _ _'}</span>
            </span>
          </li>
          <li>
            <span>Secondary Number</span>
            <span>
              <span>{customersDate?.secondary_phone ? customersDate?.secondary_phone : '_ _ _ _ _ _ _ _ _ _'}</span>
            </span>
          </li>
          <li>
            <span>Area</span>
            <span>{customersDate?.area ? `${customersDate?.area} (${customersDate?.area_en})` : '_ _ _ _ _ _ _ _ _ _'}</span>
          </li>
          <li>
            <span>Address</span>
            <span>
              <span>{customersDate?.address ? customersDate?.address : '_ _ _ _ _ _ _ _ _ _'}</span>
            </span>
          </li>
        </ul>
      </div>
      <div className="right-section">
        <div className="total-due-card">
          <h5>Total Due</h5>
          <span>: {customersDueDate.total_due ? customersDueDate.total_due : '_ _ _'} taka</span>
        </div>
        {customersDueDate?.trades?.length > 0 ? (
          <div className="custom-table-container mt-3">
            <table className="overview-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Total price</th>
                  <th>Paid</th>
                  <th>Due</th>
                </tr>
              </thead>
              <tbody>
                {customersDueDate?.trades?.map((item, i) => (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.total_price} Taka</td>
                    <td>{item.paid} Taka</td>
                    <td >
                    <span className="text-bold color-red">{item.due}</span> {" "}
                     Taka</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerInfo;
