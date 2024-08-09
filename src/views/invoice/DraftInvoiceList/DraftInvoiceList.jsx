import React, { useState, useEffect, useRef } from 'react';
import { size } from 'lodash';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Form, Button, ButtonGroup, ToggleButton, Tabs, Tab, Spinner } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';

import { useGetAllTranjectionsMutation } from '../../../store/features/transaction/transactionApi';

import DraftTable from './DraftTable';
const DraftInvoiceList = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const toastId = useRef(null);

  const [getAllTransaction, { isLoading: allTransactionLoading }] = useGetAllTranjectionsMutation();

  const [allTransactionData, setAllTransactionData] = useState([]);
  console.log("🚀 ~ DraftInvoiceList ~ allTransactionData:", allTransactionData)

  const fetchAllTransactionData = async (type) => {
    const data = {
      accessToken
    };
    try {
      const res = await getAllTransaction(data).unwrap();
      if (size(res)) {
        setAllTransactionData(res?.tranjections);
      } else {
        setAllTransactionData([]);
      }
    } catch (error) {
      setAllTransactionData([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAllTransactionData();
  }, []);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Draft Invoice Lst</Card.Title>
        </Card.Header>
        <Card.Body>
        <DraftTable productData={allTransactionData} isLoading={allTransactionLoading}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DraftInvoiceList;
