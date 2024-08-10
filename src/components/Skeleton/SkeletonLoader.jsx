import React from 'react';
import { Table, Placeholder } from 'react-bootstrap';

const SkeletonLoader = ({
  rows = 9,
  cols = 5,
  headerItem = [
    '#',
    'আইটেমের নাম (English)',
    'আইটেমের নাম (বাংলা)',
    'আইটেমের কোড',
    'আইটেম টাইপ',
    'ব্যাগ সাইজ',
    'স্টক মূল্য',
    'বিক্রয়  মূল্য',
    'অ্যাকশন'
  ]
}) => {
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
      <thead>
        <tr>
          {headerItem.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{placeholders}</tbody>
    </Table>
  );
};

export default SkeletonLoader;
