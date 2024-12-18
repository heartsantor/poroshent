import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { size } from 'lodash';

import { useGetStockDetailsByTypeMutation, useGetEarningSummaryByTypeMutation } from '../../store/features/dashboard/dashboardApi';

import { getItemName } from '../../utils/getItemName';
import StockTable from './StockTable';

// import Calculator from '../../components/Calculator/Calculator';

// const dashSalesData = [
//   { title: 'মুরগীর খাবার', amount: '$249.95', icon: 'icon-arrow-up text-c-green', value: 50, class: 'progress-c-theme' },
//   { title: 'মাছের খাবার', amount: '$2.942.32', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
//   { title: 'গরুর খাবার', amount: '$8.638.32', icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
// ];
const tabs = [
  { key: 'home', label: 'Today' },
  { key: 'week', label: 'This week' },
  { key: 'month', label: 'This Month' },
  { key: 'year', label: 'This Year' }
];

const DashDefault = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const [getStockDetails, { isLoading: isGetStockDetailsLoading }] = useGetStockDetailsByTypeMutation();
  const [getEarningSummary, { isLoading: isGetEarningSummaryLoading }] = useGetEarningSummaryByTypeMutation();

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const [stockDetails, setStockDetails] = useState([]);
  console.log('🚀 ~ DashDefault ~ stockDetails:', stockDetails);

  const fetchStockDetails = async () => {
    const data = {
      accessToken
    };
    try {
      const res = await getStockDetails(data).unwrap();
      if (size(res)) {
        setStockDetails(res.stock_summary ? res.stock_summary : []);
      }
    } catch (error) {
      setStockDetails([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, []);

  return (
    <React.Fragment>
      {/* <Calculator /> */}

      <Row>
        {stockDetails?.slice(0, 3).map((data, index) => {
          const totalBags = data.total_stock_1 + data.total_stock_5 + data.total_stock_10 + data.total_stock_25 + data.total_stock_50;
          const totalStocks =
            data.total_stock_1 + data.total_stock_5 * 5 + data.total_stock_10 * 10 + data.total_stock_25 * 25 + data.total_stock_50 * 50;
          return (
            <Col key={index} xl={6} xxl={3}>
              <Card>
                <Card.Body>
                  <h4 className="mb-4">{getItemName(data?.type)}</h4>
                  <div className="row d-flex align-items-center">
                    <div className="col-9">
                      <p className="m-0">বর্তমানে স্টকে রয়েছে</p>
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        {/* <i className={`feather ${data.icon} f-30 m-r-5`} />  */}
                        {totalBags} Bag ({totalStocks} KG)
                      </h3>
                    </div>
                    <div className="col-3 text-end">
                      <i className={`feather ${totalBags > 10 ? 'icon-arrow-up text-c-green' : 'icon-arrow-down text-c-red'} f-30 m-r-5`} />
                    </div>
                  </div>
                  <div className="row mt-2 d-flex align-items-center">
                    <div className="col-4 text-center">
                      <h6 className="my-1 border-bottom">1KG (বস্তা)</h6>
                      <span>{data.total_stock_1} টি </span>
                    </div>
                    <div className="col-4 text-center">
                      <h6 className=" my-1 border-bottom">5KG (বস্তা)</h6>
                      <span>{data.total_stock_5} টি </span>
                    </div>
                    <div className="col-4 text-center">
                      <h6 className=" my-1 border-bottom">10KG (বস্তা)</h6>
                      <span>{data.total_stock_10} টি </span>
                    </div>
                  </div>
                  <div className="row mt-2 d-flex align-items-center">
                    <div className="col-4 text-center">
                      <h6 className="my-1 border-bottom">25KG (বস্তা)</h6>
                      <span>{data.total_stock_25} টি </span>
                    </div>
                    <div className="col-4 text-center">
                      <h6 className=" my-1 border-bottom">50KG (বস্তা)</h6>
                      <span>{data.total_stock_50} টি </span>
                    </div>
                  </div>
                  {/* <div className="progress m-t-20" style={{ height: '7px' }}>
                    <div
                      className={`progress-bar ${data.class}`}
                      role="progressbar"
                      style={{ width: `${data.value}%` }}
                      aria-valuenow={data.value}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div> */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}

        {/* <ul className="mb-3 nav nav-pills" role="tablist">
          {tabs.map((tab) => (
            <li className="nav-item" role="presentation" key={tab.key}>
              <button
                type="button"
                id={`tab-${tab.key}`}
                role="tab"
                data-rr-ui-event-key={tab.key}
                aria-controls={`tabpane-${tab.key}`}
                aria-selected={activeTab === tab.key}
                className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <Col xl={3}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <h3>Daily sells</h3>
                </div>
                <div className="col text-end">
                  <h3>10,500 Taka</h3>
                  <h5 className="text-c-blue mb-0">
                    +5.9% <span className="text-muted">Total Earning</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="d-flex justify-content-between">
                  <p>Total stock</p>
                  <span>
                    100KG <span className="ms-2 text-primary">more</span>
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Total Sell</p>
                  <span>
                    100KG
                    <span className="ms-2 text-primary">more</span>
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Total due</p>
                  <span>
                    100KG <span className="ms-2 text-primary">more</span>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      <StockTable />
    </React.Fragment>
  );
};

export default DashDefault;
