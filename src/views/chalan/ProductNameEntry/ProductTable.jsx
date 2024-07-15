import React, { useState } from 'react';
import { size } from 'lodash';
import { Table, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getItemName } from '../../../utils/getItemName';
import { useDeleteProductMutation } from '../../../store/features/product/productApi';
import { toastAlert } from '../../../utils/AppHelpers';
import WarningModal from '../../../components/WarningModal/WarningModal';

const getColorForStock = (key) => {
  const stockColorMap = {
    stock_1: 'dark',
    stock_5: 'secondary',
    stock_10: 'success',
    stock_25: 'danger',
    stock_50: 'info'
  };

  return stockColorMap[key];
};

const generateBadges = (item) => {
  const stockKeys = [
    { key: 'stock_1', label: '1KG' },
    { key: 'stock_5', label: '5KG' },
    { key: 'stock_10', label: '10KG' },
    { key: 'stock_25', label: '25KG' },
    { key: 'stock_50', label: '50KG' }
  ];

  return stockKeys
    .filter((stock) => item[stock.key] != null)
    .map((stock, index) => (
      <h5 key={index}>
        <Badge bg={getColorForStock(stock.key)}>{stock.label}</Badge>
      </h5>
    ));
};

const ProductTable = ({ productData, onDeleteSuccess, activeKey }) => {
  console.log('🚀 ~ ProductTable ~ productData:', productData);
  const { accessToken } = useSelector((state) => state.auth);

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmDeleteProductItem = () => {
    if (!selectedProduct) return;

    const data = {
      accessToken,
      product_id: selectedProduct.id
    };

    deleteProduct(data)
      .unwrap()
      .then((res) => {
        if (size(res)) {
          if (res.flag === 200) {
            toastAlert('success', res.message);
            onDeleteSuccess();
            handleClose();
          } else {
            toastAlert('error', res.error);
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Table responsive hover className="recent-users">
        <thead>
          <tr>
            <th>#</th>
            <th>আইটেমের নাম (English)</th>
            <th>আইটেমের নাম (বাংলা)</th>
            {activeKey === '2' && <th>category</th>}
            <th>আইটেমের কোড</th>
            <th>আইটেম টাইপ</th>
            <th>ব্যাগ সাইজ</th>
            <th>stock_price</th>
            <th>sell_price</th>
            {/* <th>নোট</th> */}
            <th>অ্যাকশন </th>
          </tr>
        </thead>
        <tbody>
          {productData?.map((item, i) => (
            <tr className="unread" key={i}>
              <td>{i + 1}</td>
              <td>
                <p className="m-0">{item.name_en}</p>
              </td>
              <td>
                <p className="m-0">{item.name}</p>
              </td>
              {activeKey === '2' && (
                <td>
                  <p className="m-0">{item.category}</p>
                </td>
              )}

              <td>
                <p className="m-0">{item.code}</p>
              </td>
              <td>
                <p className="m-0">{getItemName(item.type)}</p>
              </td>
              <td>
                <div className="d-flex gap-2">{generateBadges(item)}</div>
              </td>
              <td>
                <p className="m-0">{item.stock_price === null ? 0 : item.stock_price} টাকা</p>
              </td>
              <td>
                <p className="m-0">{item.sell_price === null ? 0 : item.sell_price} টাকা</p>
              </td>
              {/* <td>
                <p className="m-0">none</p>
              </td> */}
              <td>
                <Link to="#" className="label theme-bg text-white f-12">
                  এডিট
                </Link>
                <Link to="#" className="label theme-bg2 text-white f-12" onClick={() => handleShow(item)}>
                  ডিলিট
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <WarningModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={confirmDeleteProductItem}
        title="Confirmation"
        body="Are you sure you want to delete this product?"
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductTable;
