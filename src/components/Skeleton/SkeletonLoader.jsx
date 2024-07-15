import React from 'react';
import { Table, Placeholder } from 'react-bootstrap';

const SkeletonLoader = ({ rows = 5, cols = 5 }) => {
  const placeholders = Array.from({ length: rows }).map((_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: cols }).map((_, colIndex) => (
        <td key={colIndex}>
          <Placeholder as="p" animation="glow" className="custom-placeholder m-0 my-1">
            <Placeholder xs={12} />
          </Placeholder>
        </td>
      ))}
    </tr>
  ));

  return (
    <Table responsive hover>
      {/* <thead>
        <tr>
          {Array.from({ length: cols }).map((_, index) => (
            <th key={index}>
              <Placeholder as="p" animation="glow" className="custom-placeholder">
                <Placeholder xs={12} />
              </Placeholder>
            </th>
          ))}
        </tr>
      </thead> */}
      <thead>
        <tr>
          <th>#</th>
          <th>আইটেমের নাম (English)</th>
          <th>আইটেমের নাম (বাংলা)</th>
          <th>আইটেমের কোড</th>
          <th>আইটেম টাইপ</th>
          <th>ব্যাগ সাইজ</th>
          <th>stock_price</th>
          <th>sell_price</th>
          {/* <th>নোট</th> */}
          <th>অ্যাকশন </th>
        </tr>
      </thead>
      <tbody>{placeholders}</tbody>
    </Table>
  );
};

export default SkeletonLoader;
