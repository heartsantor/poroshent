import React, { useState } from 'react';
import { size } from 'lodash';
import { Row, Col, Card, Table, Tabs, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDeleteAreaMutation } from '../../../store/features/area/areaApi';
import { toastAlert } from '../../../utils/AppHelpers';

import WarningModal from '../../../components/Modal/WarningModal';
import SkeletonLoader from '../../../components/Skeleton/SkeletonLoader';

const CustomerAreaList = ({ resData = [], onDeleteSuccess, isLoading }) => {
  const { accessToken } = useSelector((state) => state.auth);

  const [deleteItem, { isLoading: isDeleting }] = useDeleteAreaMutation();

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (product) => {
    setSelected(product);
    setShowModal(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const confirmDeleteProductItem = () => {
    if (!selected) return;

    const data = {
      accessToken,
      area_id: selected.id
    };

    deleteItem(data)
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
            <th>Area Name (EN)</th>
            <th>Area Name (বাংলা)</th>
            <th>Note</th>
            <th>অ্যাকশন </th>
          </tr>
        </thead>
        <tbody>
          {resData?.map((item, i) => (
            <tr className="unread" key={i}>
              <td>{i + 1}</td>
              <td>
                <p className="m-0">{item.area_name_en}</p>
              </td>
              <td>
                <p className="m-0">{item.area_name_bd}</p>
              </td>
              <td>
                <p className="m-0">{item.note}</p>
              </td>

              <td>
                <Link to={`/customer/customer-area/${item.id}`} onClick={scrollToTop} className="label theme-bg text-white f-12">
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

export default CustomerAreaList;
