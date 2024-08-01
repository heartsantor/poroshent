import React, { useState } from 'react';
import { Row, Col, Card, Table, Tabs, Badge } from 'react-bootstrap';
import { size } from 'lodash';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDeleteCustomerMutation } from '../../../store/features/customer/customerApi';
import { toastAlert } from '../../../utils/AppHelpers';
import WarningModal from '../../../components/Modal/WarningModal';
import SkeletonLoader from '../../../components/Skeleton/SkeletonLoader';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const CustomerTable = ({ customerData, onDeleteSuccess, isLoading }) => {
  const { accessToken } = useSelector((state) => state.auth);

  const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();
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
      customer_id: selectedProduct.id
    };

    deleteCustomer(data)
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

  if (isLoading) {
    return <SkeletonLoader rows={5} cols={9} />;
  }

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
                <Link to={`/customer/customer-add/${item.id}`} onClick={scrollToTop} className="label theme-bg text-white f-12">
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

export default CustomerTable;
