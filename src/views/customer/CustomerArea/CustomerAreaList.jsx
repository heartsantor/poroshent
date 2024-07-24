import React from 'react';
import { Row, Col, Card, Table, Tabs, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomerAreaList = ({ customerData = [], onDeleteSuccess, isLoading }) => {
  return (
    <div>
      <Table responsive hover className="recent-users">
        <thead>
          <tr>
            <th>#</th>
            <th>Area Name (EN)</th>
            <th>Area Name (বাংলা)</th>
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

export default CustomerAreaList;
