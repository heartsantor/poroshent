import React, { useState } from 'react';
import { size } from 'lodash';
import { Table, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getBagToKg, getStockTotalAmount, getSellTotalAmount } from '../../../utils/getStocks';
import { useDeleteProductMutation } from '../../../store/features/product/productApi';
import { toastAlert } from '../../../utils/AppHelpers';
import WarningModal from '../../../components/Modal/WarningModal';
import SkeletonLoader from '../../../components/Skeleton/SkeletonLoader';

import { formatDateAndTime } from '../../../utils/dateTime';
import { getPaymentType } from '../../../utils/getPaymentType';
// const getColorForStock = (key) => {
//   const stockColorMap = {
//     stock_1: 'dark',
//     stock_5: 'secondary',
//     stock_10: 'success',
//     stock_25: 'danger',
//     stock_50: 'info'
//   };

//   return stockColorMap[key];
// };

const generateBadges = (item, t) => {
  console.log('🚀 ~ generateBadges ~ item:', item);
  const stockKeys = [
    { key: 'check_stock_1', bag: 'stock_1', label: '1' },
    { key: 'check_stock_5', bag: 'stock_5', label: '5' },
    { key: 'check_stock_10', bag: 'stock_10', label: '10' },
    { key: 'check_stock_25', bag: 'stock_25', label: '25' },
    { key: 'check_stock_50', bag: 'stock_50', label: '50' }
  ];

  const badges = stockKeys
    .filter((stock) => item[stock.key] > 0)
    .map((stock) => (
      <div key={stock.key} className="item-wrapper">
        <div className={`item-size ${stock.key}`}>{stock.label}KG</div>
        <div className="item-qty">
          {item[stock.bag] ?? 0} {t('bags')}
        </div>
      </div>
    ));

  if (badges.length === 0) {
    return <div className="text-danger">No Stock</div>;
  }

  return badges;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const SupplyTable = ({ productData = [], isLoading }) => {
  const { t } = useTranslation();

  const { accessToken } = useSelector((state) => state.auth);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
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

  if (isLoading) {
    return <SkeletonLoader rows={5} cols={9} />;
  }

  return (
    <div>
      <Table responsive hover className="recent-users">
        <thead>
          <tr>
            <th>#</th>
            <th>DATE</th>
            <th>Receipt No</th>
            <th>Invoice No</th>
            <th>Client</th>
            <th>Payment Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Money Receipt</th>
            <th>অ্যাকশন </th>
          </tr>
        </thead>
        <tbody>
          {productData?.map((item, i) => (
            <tr className="unread" key={i}>
              <td>{i + 1}</td>
              <td>
                <p className="m-0">{formatDateAndTime(item.created_at)}</p>
              </td>
              <td>
                <p className="m-0">{item.trade_id}</p>
              </td>
              <td>
                <p className="m-0">Not Yet</p>
              </td>
              <td>
                <span>Name: {`${item.name_en} (${item.name})`}</span>
                <br />
                <span>Number: {item.area}</span>
              </td>
              <td>{getPaymentType(item.type)}</td>
              <td>{item.trx_description ? item.trx_description : 'null'}</td>
              <td>not yet</td>
              <td>
                <Button size="sm">Print</Button>
              </td>
              <td>
                <Link to={`/chalan/product-name-entry/${item.id}`} onClick={scrollToTop} className="label theme-bg text-white f-12">
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
        isLoading={isDeleting}
      />
    </div>
  );
};

export default SupplyTable;
