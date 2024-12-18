import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { size } from 'lodash';

import { useGetTradeDetailsMutation } from '../../../store/features/trade/tradeApi';
import { tradeInvoiceData } from '../../../data/trade-invoice';
import { formatDateBangla } from '../../../utils/dateTime';
import { convertToBanglaNumber } from '../../../utils/convertToBanglaNumber';
import { toBengaliWords } from '../../../utils/toBengaliWords';

import LoadingSpinner from '../../../components/Loader/LoadingSpinner';

import paidIcon from '../../../assets/icon/paid.png';
import unpaidIcon from '../../../assets/icon/unpaid.png';
import partialIcon from '../../../assets/icon/partial_paid.png';

import './tradeStyle.scss';

const TradeReceipts = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const { tradeId } = useParams();
  const navigate = useNavigate();

  const [getSingleTrade, { isLoading: isSingleTradeLoading }] = useGetTradeDetailsMutation();

  const [singleTrade, setSingleTrade] = useState({});
  console.log('🚀 ~ TradeReceipts ~ singleTrade:', singleTrade);

  const fetchSingleTrade = async () => {
    const data = {
      accessToken,
      trade_id: tradeId
    };
    try {
      const res = await getSingleTrade(data).unwrap();
      if (size(res)) {
        setSingleTrade(res);
      }
    } catch (error) {
      setSingleTrade({});
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchSingleTrade();
  }, []);

  const date = new Date();
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  const originalTitle = document.title;

  useEffect(() => {
    document.title = `invoice_${formattedDate}_${tradeId}`;
  }, [tradeId]);


  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
      setIsPrinting(false);
    }, 0);
  };

  const minRows = 10;
  const emptyRows = minRows - singleTrade?.products?.length;

  if (isSingleTradeLoading) {
    return <LoadingSpinner isInitialLoading={true} />;
  }

  return (
    <div className="invoice-container">
      {!isPrinting && (
        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
      )}
      <div className="invoice-content">
        <div className="invoice-copy">
          <div className="invoice-header">
            <div className="invoice-header-into">
              <h1>বিসমিল্লাহির রাহমানির রাহিম</h1>
            </div>
            <div className="invoice-header-company">
              <div className="invoice-header-company-name">
                <h1>{tradeInvoiceData.invoiceName}</h1>
              </div>
              <div className="invoice-header-company-contact">
                <div className="invoice-header-company-number">
                  <p>ওয়েবসাইট:</p>
                  <span>{tradeInvoiceData.Website}</span>
                </div>
                <div className="invoice-header-company-number">
                  <p>ইমেইল: </p>
                  <span>{tradeInvoiceData.email}</span>
                </div>
                <div className="invoice-header-company-number">
                  <p>মোবাইল :</p>
                  <span>{tradeInvoiceData.mobile1}</span>
                </div>
              </div>
            </div>

            <div className="invoice-header-provider">
              <div className="invoice-header-provider-name">
                <h1>{tradeInvoiceData.providerName}</h1>
                <p>{tradeInvoiceData.providerAddress} </p>
              </div>
              <div className="invoice-header-provider-copy">অফিস কপি</div>
            </div>
            <div className="invoice-header-ads">
              <p>এখানে সুষম ও মানসম্পন্ন মাছ-মুরগীর খাদ্য বিক্রয় করা হয়। </p>
            </div>
            <div className="invoice-header-client">
              <div className="invoice-header-client-date">
                <div className="invoice-no">
                  <p>ক্রমিক নং: </p>
                  <span>{singleTrade.trade_id}</span>
                </div>
                <div className="invoice-date">
                  <p>তারিখ:</p> <span>{formatDateBangla(singleTrade?.date)}</span>
                </div>
              </div>
              <div className="invoice-header-client-information">
                <div className="invoice-name">
                  <p>নাম:</p>
                  <span>{singleTrade?.customer?.name}</span>
                </div>
                <div className="invoice-mobile">
                  <p>মোবাইল:</p>
                  <span>{convertToBanglaNumber(singleTrade?.customer?.primary_phone)}</span>
                </div>
              </div>
              <div className="invoice-header-client-address">
                <p>ঠিকানা :</p>
                <span>{singleTrade?.customer?.address}</span>
              </div>
            </div>
          </div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>নং:</th>
                <th>বিবরণ</th>
                <th>পরিমান</th>
                <th>ওজন</th>
                <th>দর (KG)</th>
                <th>মোট মূল্য </th>
              </tr>
            </thead>
            <tbody>
              {singleTrade?.products?.map((item, index) => (
                <tr key={index}>
                  <td>{convertToBanglaNumber(index + 1)}</td>
                  <td>{item.name}</td>
                  <td>
                    {`${item.stock_1 ? `${convertToBanglaNumber(1)}কেজি × ${convertToBanglaNumber(item.stock_1)} বস্তা` : ''}`}
                    {`${item.stock_5 ? `${convertToBanglaNumber(5)}কেজি × ${convertToBanglaNumber(item.stock_5)} বস্তা` : ''}`}
                    {`${item.stock_10 ? `${convertToBanglaNumber(10)}কেজি × ${convertToBanglaNumber(item.stock_10)} বস্তা` : ''}`}
                    {`${item.stock_25 ? `${convertToBanglaNumber(25)}কেজি × ${convertToBanglaNumber(item.stock_25)} বস্তা` : ''}`}
                    {`${item.stock_50 ? `${convertToBanglaNumber(50)}কেজি × ${convertToBanglaNumber(item.stock_50)} বস্তা` : ''}`}
                  </td>
                  <td>
                    {`${item.stock_1 ? `${convertToBanglaNumber(item.stock_1 * 1)} কেজি` : ''}`}
                    {`${item.stock_5 ? `${convertToBanglaNumber(item.stock_5 * 5)} কেজি` : ''}`}
                    {`${item.stock_10 ? `${convertToBanglaNumber(item.stock_10 * 10)} কেজি` : ''}`}
                    {`${item.stock_25 ? `${convertToBanglaNumber(item.stock_25 * 25)} কেজি` : ''}`}
                    {`${item.stock_50 ? `${convertToBanglaNumber(item.stock_50 * 50)} কেজি` : ''}`}
                  </td>
                  <td>{convertToBanglaNumber(item.sell_price)} টাকা</td>
                  <td>
                    {`${item.stock_1 ? `${convertToBanglaNumber(item.sell_price * item.stock_1 * 1)} টাকা` : ''}`}
                    {`${item.stock_5 ? `${convertToBanglaNumber(item.sell_price * item.stock_5 * 5)} টাকা` : ''}`}
                    {`${item.stock_10 ? `${convertToBanglaNumber(item.sell_price * item.stock_10 * 10)} টাকা` : ''}`}
                    {`${item.stock_25 ? `${convertToBanglaNumber(item.sell_price * item.stock_25 * 25)} টাকা` : ''}`}
                    {`${item.stock_50 ? `${convertToBanglaNumber(item.sell_price * item.stock_50 * 50)} টাকা` : ''}`}
                  </td>
                </tr>
              ))}
              {Array.from({ length: emptyRows }).map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td>{convertToBanglaNumber(singleTrade?.products?.length + index + 1)}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="invoice-summary">
            <div className="invoice-kothay">
              <div className="invoice-kothay-text">
                <p>কথায় :</p>
                <span>{toBengaliWords(singleTrade?.paid_amount ? singleTrade?.paid_amount : 0)} টাকা মাত্র</span>
              </div>

              <div className="invoice-kothay-image">
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisXI3MXxjR6LNJajEu3nLz92bXcdYr2kgJQVLtDmLfpdo4Nh9aozRv1sUMGWZMSI6zbZnOePnL8wPv4JrKKzYYv4_zULeqTeQ_lFhkKKCtSTZo3uDuQBeGjcPs2_-Xc5BFS528aymGFCg/s1600/NOURISH+Poultry+Feed+Logo.png"
                  alt="img"
                />
              </div>
            </div>
            <table className="summary-table">
              <tbody>
                <tr>
                  <td>মোট = </td>
                  <td>{convertToBanglaNumber(singleTrade.total_cost)} টাকা</td>
                </tr>
                <tr>
                  <td>ট্রান্সপোর্ট =</td>
                  <td>{convertToBanglaNumber(singleTrade.transport_cost)} টাকা</td>
                </tr>
                <tr>
                  <td>লেবার =</td>
                  <td>{convertToBanglaNumber(singleTrade.labor_cost)} টাকা</td>
                </tr>
                <tr>
                  <td>ডিসকাউন্ট =</td>
                  <td>
                    {singleTrade.given_discount === 0 ? '' : '-'} {convertToBanglaNumber(singleTrade.given_discount)} টাকা
                  </td>
                </tr>
                <tr>
                  <td>সর্বমোট =</td>
                  <td>
                    {convertToBanglaNumber(
                      singleTrade.total_cost + singleTrade.transport_cost + singleTrade.labor_cost - singleTrade.given_discount
                    )}{' '}
                    টাকা
                  </td>
                </tr>
                <tr>
                  <td>জমা =</td>
                  <td>{convertToBanglaNumber(singleTrade.paid_amount)} টাকা</td>
                </tr>
                <tr>
                  <td>বাকী =</td>
                  <td>{convertToBanglaNumber(singleTrade.due_amount)} টাকা</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="invoice-footer">
            <div className="invoice-footer-client">
              <span>গ্রহীতার স্বাক্ষর</span>
            </div>
            <div className="invoice-footer-ads">
              <span>একদিনের ব্রয়লার , লেয়ার ,কর্ক বাচ্চা বিক্রয় করা হয়।</span>
            </div>
            <div className="invoice-footer-office">
              <span>বিক্রেতার স্বাক্ষর </span>
            </div>
          </div>
          <div className="seal-mohor">
            {singleTrade?.due_amount === 0 ? (
              <div className="image-wrapper">
                <img alt="payment-status" src={paidIcon} />
              </div>
            ) : null}
            {singleTrade?.paid_amount === 0 ? (
              <div className="image-wrapper">
                <img alt="payment-status" src={unpaidIcon} />
              </div>
            ) : null}
            {singleTrade?.paid_amount > 0 && singleTrade?.due_amount > 0 ? (
              <div className="image-wrapper">
                <img alt="payment-status" src={partialIcon} />
              </div>
            ) : null}
          </div>
        </div>
        <div className="divider"></div>
        <div className="invoice-copy">
          <div className="invoice-header">
            <div className="invoice-header-into">
              <h1>বিসমিল্লাহির রাহমানির রাহিম</h1>
            </div>
            <div className="invoice-header-company">
              <div className="invoice-header-company-name">
                <h1>{tradeInvoiceData.invoiceName}</h1>
              </div>
              <div className="invoice-header-company-contact">
                <div className="invoice-header-company-number">
                  <p>ওয়েবসাইট:</p>
                  <span>{tradeInvoiceData.Website}</span>
                </div>
                <div className="invoice-header-company-number">
                  <p>ইমেইল: </p>
                  <span>{tradeInvoiceData.email}</span>
                </div>
                <div className="invoice-header-company-number">
                  <p>মোবাইল :</p>
                  <span>{tradeInvoiceData.mobile1}</span>
                </div>
              </div>
            </div>

            <div className="invoice-header-provider">
              <div className="invoice-header-provider-name">
                <h1>{tradeInvoiceData.providerName}</h1>
                <p>{tradeInvoiceData.providerAddress} </p>
              </div>
              <div className="invoice-header-provider-copy">গ্রাহক কপি</div>
            </div>
            <div className="invoice-header-ads">
              <p>এখানে সুষম ও মানসম্পন্ন মাছ-মুরগীর খাদ্য বিক্রয় করা হয়। </p>
            </div>
            <div className="invoice-header-client">
              <div className="invoice-header-client-date">
                <div className="invoice-no">
                  <p>ক্রমিক নং: </p>
                  <span>{singleTrade.trade_id}</span>
                </div>
                <div className="invoice-date">
                  <p>তারিখ:</p> <span>{formatDateBangla(singleTrade?.date)}</span>
                </div>
              </div>
              <div className="invoice-header-client-information">
                <div className="invoice-name">
                  <p>নাম:</p>
                  <span>{singleTrade?.customer?.name}</span>
                </div>
                <div className="invoice-mobile">
                  <p>মোবাইল:</p>
                  <span>{convertToBanglaNumber(singleTrade?.customer?.primary_phone)}</span>
                </div>
              </div>
              <div className="invoice-header-client-address">
                <p>ঠিকানা :</p>
                <span>{singleTrade?.customer?.address}</span>
              </div>
            </div>
          </div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>নং:</th>
                <th>বিবরণ</th>
                <th>পরিমান</th>
                <th>ওজন</th>
                <th>দর (KG)</th>
                <th>মোট মূল্য </th>
              </tr>
            </thead>
            <tbody>
              {singleTrade?.products?.map((item, index) => (
                <tr key={index}>
                  <td>{convertToBanglaNumber(index + 1)}</td>
                  <td>{item.name}</td>
                  <td>
                    {`${item.stock_1 ? `${convertToBanglaNumber(1)}কেজি × ${convertToBanglaNumber(item.stock_1)} বস্তা` : ''}`}
                    {`${item.stock_5 ? `${convertToBanglaNumber(5)}কেজি × ${convertToBanglaNumber(item.stock_5)} বস্তা` : ''}`}
                    {`${item.stock_10 ? `${convertToBanglaNumber(10)}কেজি × ${convertToBanglaNumber(item.stock_10)} বস্তা` : ''}`}
                    {`${item.stock_25 ? `${convertToBanglaNumber(25)}কেজি × ${convertToBanglaNumber(item.stock_25)} বস্তা` : ''}`}
                    {`${item.stock_50 ? `${convertToBanglaNumber(50)}কেজি × ${convertToBanglaNumber(item.stock_50)} বস্তা` : ''}`}
                  </td>
                  <td>
                    {`${item.stock_1 ? `${convertToBanglaNumber(item.stock_1 * 1)} কেজি` : ''}`}
                    {`${item.stock_5 ? `${convertToBanglaNumber(item.stock_5 * 5)} কেজি` : ''}`}
                    {`${item.stock_10 ? `${convertToBanglaNumber(item.stock_10 * 10)} কেজি` : ''}`}
                    {`${item.stock_25 ? `${convertToBanglaNumber(item.stock_25 * 25)} কেজি` : ''}`}
                    {`${item.stock_50 ? `${convertToBanglaNumber(item.stock_50 * 50)} কেজি` : ''}`}
                  </td>
                  <td>{convertToBanglaNumber(item.sell_price)} টাকা</td>
                  <td>
                    {`${item.stock_1 ? `${convertToBanglaNumber(item.sell_price * item.stock_1 * 1)} টাকা` : ''}`}
                    {`${item.stock_5 ? `${convertToBanglaNumber(item.sell_price * item.stock_5 * 5)} টাকা` : ''}`}
                    {`${item.stock_10 ? `${convertToBanglaNumber(item.sell_price * item.stock_10 * 10)} টাকা` : ''}`}
                    {`${item.stock_25 ? `${convertToBanglaNumber(item.sell_price * item.stock_25 * 25)} টাকা` : ''}`}
                    {`${item.stock_50 ? `${convertToBanglaNumber(item.sell_price * item.stock_50 * 50)} টাকা` : ''}`}
                  </td>
                </tr>
              ))}
              {Array.from({ length: emptyRows }).map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td>{convertToBanglaNumber(singleTrade?.products?.length + index + 1)}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="invoice-summary">
            <div className="invoice-kothay">
              <div className="invoice-kothay-text">
                <p>কথায় :</p>
                <span>{toBengaliWords(singleTrade?.paid_amount ? singleTrade?.paid_amount : 0)} টাকা মাত্র</span>
              </div>

              <div className="invoice-kothay-image">
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisXI3MXxjR6LNJajEu3nLz92bXcdYr2kgJQVLtDmLfpdo4Nh9aozRv1sUMGWZMSI6zbZnOePnL8wPv4JrKKzYYv4_zULeqTeQ_lFhkKKCtSTZo3uDuQBeGjcPs2_-Xc5BFS528aymGFCg/s1600/NOURISH+Poultry+Feed+Logo.png"
                  alt="img"
                />
              </div>
            </div>
            <table className="summary-table">
              <tbody>
                <tr>
                  <td>মোট = </td>
                  <td>{convertToBanglaNumber(singleTrade.total_cost)} টাকা</td>
                </tr>
                <tr>
                  <td>ট্রান্সপোর্ট =</td>
                  <td>{convertToBanglaNumber(singleTrade.transport_cost)} টাকা</td>
                </tr>
                <tr>
                  <td>লেবার =</td>
                  <td>{convertToBanglaNumber(singleTrade.labor_cost)} টাকা</td>
                </tr>
                <tr>
                  <td>ডিসকাউন্ট =</td>
                  <td>
                    {singleTrade.given_discount === 0 ? '' : '-'} {convertToBanglaNumber(singleTrade.given_discount)} টাকা
                  </td>
                </tr>
                <tr>
                  <td>সর্বমোট =</td>
                  <td>
                    {convertToBanglaNumber(
                      singleTrade.total_cost + singleTrade.transport_cost + singleTrade.labor_cost - singleTrade.given_discount
                    )}{' '}
                    টাকা
                  </td>
                </tr>
                <tr>
                  <td>জমা =</td>
                  <td>{convertToBanglaNumber(singleTrade.paid_amount)} টাকা</td>
                </tr>
                <tr>
                  <td>বাকী =</td>
                  <td>{convertToBanglaNumber(singleTrade.due_amount)} টাকা</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="invoice-footer">
            <div className="invoice-footer-client">
              <span>গ্রহীতার স্বাক্ষর</span>
            </div>
            <div className="invoice-footer-ads">
              <span>একদিনের ব্রয়লার , লেয়ার ,কর্ক বাচ্চা বিক্রয় করা হয়।</span>
            </div>
            <div className="invoice-footer-office">
              <span>বিক্রেতার স্বাক্ষর </span>
            </div>
          </div>
          <div className="seal-mohor">
            {singleTrade?.due_amount === 0 ? (
              <div className="image-wrapper">
                <img alt="payment-status" src={paidIcon} />
              </div>
            ) : null}
            {singleTrade?.paid_amount === 0 ? (
              <div className="image-wrapper">
                <img alt="payment-status" src={unpaidIcon} />
              </div>
            ) : null}
            {singleTrade?.paid_amount > 0 && singleTrade?.due_amount > 0 ? (
              <div className="image-wrapper">
                <img alt="payment-status" src={partialIcon} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeReceipts;
