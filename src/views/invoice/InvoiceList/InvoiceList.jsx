import React, { useState, useEffect, useRef } from 'react';
import { size } from 'lodash';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Form, Button, ButtonGroup, ToggleButton, Tabs, Tab, Spinner } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';

import { useGetAllTradesMutation} from '../../../store/features/trade/tradeApi';

import InvoiceTable from './InvoiceTable';

const InvoiceList = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const toastId = useRef(null);

  const [getAllTrades, { isLoading: allTradesLoading }] = useGetAllTradesMutation();

  const [allTradesData, setAllTradesData] = useState([]);
  console.log("🚀 ~ DraftInvoiceList ~ allTransactionData:", allTradesData)

  const fetchAllTransactionData = async (type) => {
    const data = {
      accessToken
    };
    try {
      const res = await getAllTrades(data).unwrap();
      if (size(res)) {
        setAllTradesData(res?.trades);
      } else {
        setAllTradesData([]);
      }
    } catch (error) {
      setAllTradesData([]);
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
          <Card.Title as="h5">Invoice List</Card.Title>
        </Card.Header>
        <Card.Body>
        <InvoiceTable productData={allTradesData} isLoading={allTradesLoading}/>
    
        </Card.Body>
      </Card>
    </div>
  )
}

export default InvoiceList