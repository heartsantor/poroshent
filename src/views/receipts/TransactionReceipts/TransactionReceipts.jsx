import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { size } from 'lodash';

import { useGetTranjectionByIdMutation } from '../../../store/features/transaction/transactionApi';
import { tradeInvoiceData } from '../../../data/trade-invoice.js';
import { formatDateBangla } from '../../../utils/dateTime';
import { getPaymentType } from '../../../utils/getPaymentType';
import { convertToBanglaNumber } from '../../../utils/convertToBanglaNumber';
import { toBengaliWords } from '../../../utils/toBengaliWords';

import LoadingSpinner from '../../../components/Loader/LoadingSpinner';

import './transactionStyle.scss';

const TransactionReceipts = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [getSingleTransaction, { isLoading: isSingleTransactionLoading }] = useGetTranjectionByIdMutation();

  const [singleTransaction, setSingleTransaction] = useState({});
  console.log('🚀 ~ TradeReceipts ~ singleTrade:', singleTransaction);

  const fetchSingleTransaction = async () => {
    const data = {
      accessToken,
      tranjection_id: transactionId
    };
    try {
      const res = await getSingleTransaction(data).unwrap();
      if (size(res)) {
        setSingleTransaction(res?.tranjection ? res?.tranjection : {});
      }
    } catch (error) {
      setSingleTransaction({});
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSingleTransaction();
  }, []);

  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 0);
  };

  const ReceiptContent = ({ copy = 'Office Copy' }) => {
    return (
      <div className="moneyReceiptBody">
        <div className="card money-receipt-card">
          <div className="card-header money-receipt-header">
            <div className="row">
              <div className="col-4 px-1">
                <h4 className="receipt-address">{tradeInvoiceData.providerName}</h4>
                <h4 className="receipt-email">{tradeInvoiceData.providerAddress}</h4>
                <div className="receipt-data">
                  <p className="receipt-phone">
                    <span>মোবাইল :</span>
                    {tradeInvoiceData.mobile1}
                  </p>
                  <div className=" d-flex align-items-center">
                    <p className="receipt-phone me-2">
                      <span>E:</span>
                      {tradeInvoiceData.email},
                    </p>
                    <p className="receipt-phone">
                      <span> W:</span>
                      {tradeInvoiceData.Website}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4 text-center">
                <h3 className="receipt-name mb-3">{tradeInvoiceData.invoiceName}</h3>
                <h2 className="receipt-title">Money Receipt</h2>
              </div>
              <div className="col-4 px-0">
                <div className="receipt-info-wrapper">
                  <div className="copy-of">{copy}</div>
                  <table className="table-bordered w-100 receipt-info">
                    <tbody>
                      <tr>
                        <td className="receipt-no">রিসিট নং : #{singleTransaction.id}</td>
                      </tr>
                      <tr>
                        <td className="receipt-date">তারিখ: {formatDateBangla(singleTransaction.created_at)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body money-receipt-body">
            <div className="client-info">
              <h2 className="client-received">
                <strong>গ্রহীতার নাম :</strong> {singleTransaction?.name}
              </h2>
              <div className="row">
                <div className="col-6">
                  <h2 className="client-mobile">
                    <strong>মোবাইল :</strong> {singleTransaction?.primary_phone}
                  </h2>
                </div>
                <div className="col-6">
                  <h2 className="client-bank">
                    <strong>পেমেন্ট মাধ্যম :</strong> {getPaymentType(singleTransaction?.type)}
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <h2 className="client-cheque">
                    <strong>ঠিকানা :</strong> {singleTransaction?.address}
                  </h2>
                </div>
                <div className="col-6">
                  <h2 className="client-payment-method">
                    <strong>ট্রান্সেকশন আইডি :</strong>
                    {singleTransaction?.trx_id}
                  </h2>
                </div>
              </div>
              <h2 className="client-description">
                <strong>বিবরণ :</strong> {singleTransaction?.trx_description}
              </h2>
              <h2 className="client-amount">
                <strong>কথায় :</strong> {toBengaliWords(singleTransaction?.amount ? singleTransaction?.amount : 0)} টাকা মাত্র
              </h2>
              <h3 className="client-total mt-2">
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>BDT :</strong> <span className="amount-box">{singleTransaction?.amount}</span>
                    <span className="ms-2">টাকা</span>
                  </div>
                  <div>
                    <strong>শেষের বাকি :</strong> <span className="amount-box">{singleTransaction?.due}</span>
                    <span className="ms-2">টাকা</span>{' '}
                  </div>
                </div>
              </h3>
            </div>
            <div className="client-signatures">
              <div className="row">
                <div className="col-4 px-0 text-center">
                  <h5 className="signature-box">গ্রহিতার স্বাক্ষর</h5>
                </div>
                <div className="col-4 px-0 text-center">
                  <h5 className="signature-box">একাউন্ট</h5>
                </div>
                <div className="col-4 px-0 text-center">
                  <h5 className="signature-box">অনুমোদন স্বাক্ষর</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isSingleTransactionLoading) {
    return <LoadingSpinner isInitialLoading={true} />;
  }

  return (
    <div className="money-print">
      {!isPrinting && (
        <div className="text-center">
          <button className="print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
      )}
      <ReceiptContent copy="অফিস কপি" />
      <div className="divider"></div>
      <ReceiptContent copy="গ্রাহক কপি" />
    </div>
  );
};

export default TransactionReceipts;
