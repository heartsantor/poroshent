import React, { useState, useEffect } from 'react';
import { Spinner, Table, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetProductMutation } from '../../store/features/product/productApi';
import { getItemName } from '../../utils/getItemName';
import { getBagToKg, getStockTotalAmount, getSellTotalAmount } from '../../utils/getStocks';
import { moneyFixed } from '../../utils/moneyFixed';

const generateBadges = (item) => {
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
      <div key={stock.key} className="badge-wrapper">
        <div className={`bag-size ${stock.key}`}>{stock.label}KG</div>
        <div className="has-qty">{item[stock.bag] ?? 0} bags</div>
      </div>
    ));

  if (badges.length === 0) {
    return <div className="text-danger">No Stock</div>;
  }

  return badges;
};

const calculateTotals = (items) => {
  return items.reduce(
    (totals, item) => {
      const getTotalStockPrice = parseFloat(getStockTotalAmount(item)) || 0.0;
      const getTotalSellPrice = parseFloat(getSellTotalAmount(item)) || 0.0;

      totals.stockPriceTotal += getTotalStockPrice;
      totals.sellPriceTotal += getTotalSellPrice;
      return totals;
    },
    { stockPriceTotal: 0, sellPriceTotal: 0 }
  );
};

const renderTableBody = (items) => {
  return (
    <>
      {items.map((item, i) => {
        const getTotalStockPrice = getStockTotalAmount(item);
        const getTotalSellPrice = getSellTotalAmount(item);
        return (
          <tr className="unread" key={i}>
            <td>{i + 1}</td>
            <td>
              <p className="m-0">{item.name_en}</p>
            </td>
            <td>
              <p className="m-0">{item.name}</p>
            </td>
            <td>
              <p className="m-0">{item.category}</p>
            </td>
            <td>
              <p className="m-0">{item.code}</p>
            </td>
            <td>
              <p className="m-0">{getItemName(item.type)}</p>
            </td>
            <td>
              <div className="d-flex gap-4">{generateBadges(item)}</div>
            </td>
            <td>
              <p className="m-0">{getBagToKg(item)} KG</p>
            </td>
            <td>
              <p className="m-0">{item.stock_price === null ? 0 : item.stock_price} টাকা</p>
            </td>
            <td>
              <p className="m-0">{item.sell_price === null ? 0 : item.sell_price} টাকা</p>
            </td>
            <td>
              <p className="m-0 fw-bold">{moneyFixed(getTotalStockPrice)} টাকা</p>
            </td>
            <td>
              <p className="m-0 fw-bold">{moneyFixed(getTotalSellPrice)} টাকা</p>
            </td>
          </tr>
        );
      })}
    </>
  );
};

const StockTable = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getProduct, { isLoading, isError }] = useGetProductMutation();
  const [products, setProducts] = useState([]);
  console.log('🚀 ~ StockTable ~ products:', products);

  const fetchProductData = async () => {
    const data = {
      accessToken: accessToken
    };
    try {
      const res = await getProduct(data).unwrap();
      if (res?.product?.length) {
        setProducts(res.product);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  const groupedProducts = products.reduce((groups, item) => {
    const type = item.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(item);
    return groups;
  }, {});

  return (
    <Card>
      <Card.Body>
        {Object.keys(groupedProducts).map((type, index) => {
          const items = groupedProducts[type];
          const totals = calculateTotals(items);
          return (
            <div key={index}>
              <h5 className="mt-2">{getItemName(parseInt(type))}</h5>
              <Table responsive hover className="recent-users">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>আইটেমের নাম (English)</th>
                    <th>আইটেমের নাম (বাংলা)</th>
                    <th>category</th>
                    <th>আইটেমের কোড</th>
                    <th>আইটেম টাইপ</th>
                    <th>স্টক রয়েছে</th>
                    <th>Total KG</th>
                    <th>stock_price</th>
                    <th>sell_price</th>
                    <th>Total Stock Price</th>
                    <th>Total Sell Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="highlighted-row">
                    <td colSpan="10" className="text-end fw-bold">
                      Total:
                    </td>
                    <td className="fw-bold text-primary">{moneyFixed(totals.stockPriceTotal)} টাকা</td>
                    <td className="fw-bold text-primary">{moneyFixed(totals.sellPriceTotal)} টাকা</td>
                  </tr>
                  {renderTableBody(items)}
                </tbody>
              </Table>
            </div>
          );
        })}
        {isError && <div>No Data/ Error</div>}
      </Card.Body>
    </Card>
  );
};

export default StockTable;
