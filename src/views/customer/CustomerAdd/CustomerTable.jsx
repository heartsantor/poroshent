import React from 'react';
import { Row, Col, Card, Table, Tabs, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomerTable = ({ customerData, onDeleteSuccess, isLoading }) => {
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
          {customerData?.map((item, i) => (
            <tr className="unread" key={i}>
              <td>{i + 1}</td>
              <td>
                <p className="m-0">{item.name_en}</p>
              </td>
              <td>
                <p className="m-0">{item.name}</p>
              </td>

              <td>
                <p className="m-0">{item.address}</p>
              </td>

              <td>
                <p className="m-0">{item.area}</p>
              </td>
              <td>
                <p className="m-0">{item.primary_phone}</p>
              </td>
              <td>
                <p className="m-0">{item.secondary_phone}</p>
              </td>
              <td>
                <p className="m-0">{item.credit}</p>
              </td>
              <td>
                <Link to={`/chalan/product-name-entry/${item.id}`} className="label theme-bg text-white f-12">
                  এডিট
                </Link>
                <Link to="#" className="label theme-bg2 text-white f-12">
                  ডিলিট
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerTable;
