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

const tableHeaders = [
  '#',
  'DATE',
  'Voucher No',
  'Client',
  'Product',
  'Bag',
  'QTY',
  'Price/KG',
  'Discount',
  'Transport',
  'Labour cost',
  'Total Price',
  'Due',
  'Received',
  'print',
  'Action'
];

const generateBadges = (item, t) => {
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

const InvoiceTable = ({ productData = [], isLoading }) => {
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
    return <SkeletonLoader rows={5} cols={16} headerItem={tableHeaders} />;
  }

  return (
    <div>
      <Table responsive hover className="recent-users">
        <thead>
          <tr>
            {tableHeaders.map((item, i) => (
              <th key={i} className="text-center">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productData?.map((item, i) => (
            <tr className="unread" key={i}>
              <td>{i + 1}</td>
              <td className="text-center">
                <p className="m-0">{formatDateAndTime(item.date)}</p>
              </td>
              <td className="text-center">
                <p className="m-0">{item.trade_id}</p>
              </td>
              <td className="text-center">
                <span>Name: {`${item.customer.name_en} (${item.customer.name})`}</span>
                <br />
                <span>Number: {item.customer.primary_phone}</span>
              </td>
              <td className="text-center">
                {item.products.map((product, index) => (
                  <span key={product.product_id} className="table-nested-item">
                    <span className={index !== item.products.length - 1 ? `custom-border-bottom` : ''}>
                      {product.name_en} ({product.product_id})
                    </span>
                    <br />
                  </span>
                ))}
              </td>
              <td className="text-center">
                {item.products.map((product, index) => (
                  <span key={product.product_id} className="table-nested-item">
                    <span className={index !== item.products.length - 1 ? `custom-border-bottom` : ''}>
                      {product.stock_1 ? <span>1KG</span> : null}
                      {product.stock_5 ? <span>5KG</span> : null}
                      {product.stock_10 ? <span>10KG</span> : null}
                      {product.stock_25 ? <span>25KG</span> : null}
                      {product.stock_50 ? <span>50KG</span> : null}
                    </span>
                    <br />
                  </span>
                ))}
              </td>
              <td className="text-center">
                {item.products.map((product, index) => (
                  <span key={product.product_id} className="table-nested-item">
                    <span className={index !== item.products.length - 1 ? `custom-border-bottom` : ''}>
                      {product.stock_1 ? <span>{product.stock_1}</span> : null}
                      {product.stock_5 ? <span>{product.stock_5}</span> : null}
                      {product.stock_10 ? <span>{product.stock_10}</span> : null}
                      {product.stock_25 ? <span>{product.stock_25}</span> : null}
                      {product.stock_50 ? <span>{product.stock_50}</span> : null}
                    </span>
                    <br />
                  </span>
                ))}
              </td>
              <td className="text-center">
                {item.products.map((product, index) => (
                  <span key={product.product_id} className="table-nested-item">
                    <span className={index !== item.products.length - 1 ? `custom-border-bottom` : ''}>{product.sell_price}</span>

                    <br />
                  </span>
                ))}
              </td>
              <td className="text-center">
                <p className="m-0">{item.given_discount}</p>
              </td>
              <td className="text-center">
                <p className="m-0">{item.transport_cost}</p>
              </td>
              <td className="text-center">
                <p className="m-0">{item.labor_cost}</p>
              </td>
              <td className="text-center">
                <p className="m-0">{item.total_cost}</p>
              </td>
              <td className="text-center">
                <p className="m-0">{item.due_amount}</p>
              </td>
              <td className="text-center">
                <p className="m-0">{item.paid_amount}</p>
              </td>
              <td className="text-center">
                <Link to={`/receipts/trade/${item.trade_id}`} onClick={scrollToTop} className="label theme-bg text-white f-12">
                  Print
                </Link>
              </td>
              <td className="text-center">
                <Link to={`/chalan/product-name-entry/${item.id}`} onClick={scrollToTop} className="label theme-bg text-white f-12">
                  Edit
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

export default InvoiceTable;
