import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { toast } from 'react-toastify';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { toastAlert } from '../../../utils/AppHelpers';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import {
  useAllCustomersMutation,
  useSingleCustomerMutation,
  useGetSingleCustomerDuesMutation
} from '../../../store/features/customer/customerApi';
import { useGetProductMutation } from '../../../store/features/product/productApi';
import { useMakeTradeMutation } from '../../../store/features/trade/tradeApi';

import CustomerInfo from '../../../components/CutomerInfo/CustomerInfo';
const cashOption = [
  {
    value: 1,
    label: 'Cash'
  },
  {
    value: 2,
    label: 'Bkash'
  },
  {
    value: 3,
    label: 'Nagad'
  },
  {
    value: 4,
    label: 'Rocket'
  },
  {
    value: 5,
    label: 'Bank'
  },
  {
    value: 6,
    label: 'Check'
  }
];

const MakeInvoice = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getProduct, { isLoading: allProductLoading }] = useGetProductMutation();
  const [allCustomers, { isLoading: allCustomersLoading }] = useAllCustomersMutation();
  const [singleCustomers, { isLoading: singleCustomersLoading }] = useSingleCustomerMutation();
  const [getSingleCustomerDues, { isLoading: customerDuesLoading }] = useGetSingleCustomerDuesMutation();
  const [makeTrade, { isLoading: makeTradeLoading }] = useMakeTradeMutation();

  const [startDate, setStartDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [singleCustomersDate, setSingleCustomersDate] = useState({});
  const [singleCustomersDueDate, setSingleCustomersDueDate] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState({
    value: 1,
    label: 'Cash'
  });
  const [selectedProductOption, setSelectedProductOption] = useState(null);
  const [tradeProducts, setTradeProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [laborCost, setLaborCost] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [trxId, setTrxId] = useState(null);

  const selectedCustomerData = (customersData || []).map((item) => ({
    value: item.id,
    label: item.primary_phone,
    name: item.name_en,
    note: item.area_en
  }));

  const selectedProductData = (products || []).map((item) => ({
    value: item.id,
    label: item.name_en,
    name: item.name,
    check_stock_1: item.check_stock_1,
    check_stock_5: item.check_stock_5,
    check_stock_10: item.check_stock_10,
    check_stock_25: item.check_stock_25,
    check_stock_50: item.check_stock_50,
    sell_price: item.sell_price,
    note: `${item.stock_1 > 0 ? `(1KG x ${item.stock_1}) = ` : ''} 
    ${item.stock_5 > 0 ? `(5KG x ${item.stock_5}) = ` : ''}
    ${item.stock_10 > 0 ? `(10KG x ${item.stock_10}) = ` : ''}
    ${item.stock_25 > 0 ? `(25KG x ${item.stock_25}) = ` : ''}
    ${item.stock_50 > 0 ? `(50KG x ${item.stock_50}) = ` : ''}  ${item.stock_1 + item.stock_5 + item.stock_10 + item.stock_25 + item.stock_50} ব্যাগ
    `
  }));

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleProductSelectChange = (selected) => {
    if (selected) {
      let initialBagSize = '1KG';
      if (selected.check_stock_50) {
        initialBagSize = '50KG';
      } else if (selected.check_stock_25) {
        initialBagSize = '25KG';
      } else if (selected.check_stock_10) {
        initialBagSize = '10KG';
      } else if (selected.check_stock_5) {
        initialBagSize = '5KG';
      }

      const initialTotalPrice = selected.sell_price * getBagSizeMultiplier(initialBagSize);

      const newProduct = {
        ...selected,
        quantity: 1,
        price: selected.sell_price,
        totalPrice: initialTotalPrice,
        bagSize: initialBagSize
      };

      setTradeProducts((prevTradeProducts) => {
        const updatedTradeProducts = [...prevTradeProducts, newProduct];
        return updatedTradeProducts;
      });

      setTimeout(() => {
        handleBagSizeChange(tradeProducts.length, initialBagSize); // Trigger handleBagSizeChange initially
      }, 0);

      setSelectedProductOption(null); // Reset product selection
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await getProduct({ accessToken }).unwrap();
      setProducts(res?.product || []);
    } catch (error) {
      setProducts([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchCustomersData = async () => {
    try {
      const res = await allCustomers({ accessToken }).unwrap();
      setCustomersData(res?.Customers || []);
    } catch (error) {
      setCustomersData([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchSingleCustomersData = async (id) => {
    try {
      const res = await singleCustomers({ accessToken, customer_id: id }).unwrap();
      const customerDuesRes = await getSingleCustomerDues({ accessToken, customer_id: id }).unwrap();

      setSingleCustomersDate(res?.customer || {});
      setSingleCustomersDueDate(customerDuesRes || {});
    } catch (error) {
      setSingleCustomersDate({});
      setSingleCustomersDueDate({});
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (selectedOption) {
      fetchSingleCustomersData(selectedOption.value);
    }
  }, [selectedOption]);

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...tradeProducts];
    updatedProducts[index].quantity = value;
    const bagSizeMultiplier = getBagSizeMultiplier(updatedProducts[index].bagSize);
    updatedProducts[index].totalPrice = value * updatedProducts[index].price * bagSizeMultiplier;
    setTradeProducts(updatedProducts);
  };

  const handlePriceChange = (index, value) => {
    const updatedProducts = [...tradeProducts];
    updatedProducts[index].price = value;
    const bagSizeMultiplier = getBagSizeMultiplier(updatedProducts[index].bagSize);
    updatedProducts[index].totalPrice = value * updatedProducts[index].quantity * bagSizeMultiplier;
    setTradeProducts(updatedProducts);
  };

  const handleBagSizeChange = (index, value) => {
    const updatedProducts = [...tradeProducts];
    if (updatedProducts[index]) {
      updatedProducts[index].bagSize = value;
      const bagSizeMultiplier = getBagSizeMultiplier(value);
      updatedProducts[index].totalPrice = updatedProducts[index].quantity * updatedProducts[index].price * bagSizeMultiplier;
      setTradeProducts(updatedProducts);
    }
  };

  const getBagSizeMultiplier = (bagSize) => {
    return bagSize === '1KG' ? 1 : bagSize === '5KG' ? 5 : bagSize === '10KG' ? 10 : bagSize === '25KG' ? 25 : 50;
  };

  const totalAmount = tradeProducts.reduce((sum, product) => sum + product.totalPrice, 0);
  const finalLaborCost = laborCost != '' ? laborCost : 0;
  const finalTransportCost = transportCost != '' ? transportCost : 0;
  const totalAmountIncludingCosts = totalAmount + finalLaborCost + finalTransportCost;
  const discountedAmount = totalAmountIncludingCosts - discount;
  const dueAmount = discountedAmount - paidAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    // toast.dismiss(toastId.current);
    const tradeData = {
      accessToken,
      customer_id: selectedOption.value,
      given_discount: discount,
      paid_amount: paidAmount,
      tranjection_type: selectedPayment.value,
      trx_id: trxId,
      labor_cost: laborCost,
      transport_cost: transportCost,
      products: tradeProducts.map((product) => ({
        product_id: product.value,
        stock_1: product.bagSize === '1KG' ? Number(product.quantity) : 0,
        stock_5: product.bagSize === '5KG' ? Number(product.quantity) : 0,
        stock_10: product.bagSize === '10KG' ? Number(product.quantity) : 0,
        stock_25: product.bagSize === '25KG' ? Number(product.quantity) : 0,
        stock_50: product.bagSize === '50KG' ? Number(product.quantity) : 0
      }))
    };

    makeTrade(tradeData)
      .unwrap()
      .then((res) => {
        if (size(res)) {
          if (res.flag === 200) {
            fetchProductData();
            clearAll();
            toastAlert('success', res.message);
          } else {
            toastAlert('error', res.error);
          }
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toastAlert('error', 'Something is wrong');
      });
  };

  const clearAll = () => {
    setTradeProducts([]);
    setSingleCustomersDate({});
    setSingleCustomersDueDate({});
    setDiscount(0);
    setPaidAmount(0);
    setLaborCost(0);
    setTrxId(null);
    setTransportCost(0);
    setSelectedOption(null);
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">ইনভয়েস তৈরী</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <div className="form-group w-100 mb-3">
                  <DatePicker id="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} className="form-control w-100" />
                </div>
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedCustomerData}
                    placeholder="কাস্টমার সিলেক্ট"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isLoading={allCustomersLoading}
                    header={true}
                    required={true}
                    headerLeftText="কাস্টমার নাম"
                    headerRightText="এরিয়া"
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <CustomerInfo customersDate={singleCustomersDate} customersDueDate={singleCustomersDueDate} />
                {/* <Row>
                  <Col md={6}>
                    name: {singleCustomersDate.name}
                    <h6>due: {singleCustomersDate.credit}</h6>
                  </Col>
                  <Col md={6}>address: {singleCustomersDate.address}</Col>
                </Row> */}
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedProductData}
                    placeholder="প্রোডাক্ট সিলেক্ট"
                    value={selectedProductOption}
                    onChange={handleProductSelectChange}
                    isLoading={allProductLoading}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <table className="table">
              <thead>
                <tr className="text-uppercase">
                  <th>SL</th>
                  <th>Product Name</th>
                  <th>Bag size</th>
                  <th>Available QTY</th>
                  <th>Product QTY</th>
                  <th>Product Unit</th>
                  <th>Product price</th>
                  <th>Product Total price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tradeProducts.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>
                      <Form.Control
                        className="parches-control-form"
                        id='mySelect'
                        as="select"
                        value={product.bagSize}
                        onChange={(e) => handleBagSizeChange(index, e.target.value)}
                      >
                        {product.check_stock_1 ? <option value="1KG">1KG</option> : null}
                        {product.check_stock_5 ? <option value="5KG">5KG</option> : null}
                        {product.check_stock_10 ? <option value="10KG">10KG</option> : null}
                        {product.check_stock_25 ? <option value="25KG">25KG</option> : null}
                        {product.check_stock_50 ? <option value="50KG">50KG</option> : null}
                      </Form.Control>
                    </td>
                    <td>10</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          className="invoice-input parches-control-form"
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                          onWheel={(e) => e.target.blur()}
                          inputMode="none"
                        />
                        <span className="ms-2"> Bag</span>
                      </div>
                    </td>
                    <td>
                      {product.bagSize === '1KG' ? `1KG x ${product.quantity} = ${1 * product.quantity} KG` : ''}
                      {product.bagSize === '5KG' ? `5KG x ${product.quantity} = ${5 * product.quantity} KG` : ''}
                      {product.bagSize === '10KG' ? `10KG x ${product.quantity} = ${10 * product.quantity} KG` : ''}
                      {product.bagSize === '25KG' ? `25KG x ${product.quantity} = ${25 * product.quantity} KG` : ''}
                      {product.bagSize === '50KG' ? `50KG x ${product.quantity} = ${50 * product.quantity} KG` : ''}
                    </td>
                    <td>
                      <Form.Control
                        className="parches-control-form"
                        type="number"
                        value={product.price}
                        onChange={(e) => handlePriceChange(index, e.target.value)}
                        onWheel={(e) => e.target.blur()}
                        inputMode="none"
                      />
                    </td>
                    <td>{product.totalPrice}</td>
                    <td>
                      <Button size="sm" variant="danger" onClick={() => setTradeProducts(tradeProducts.filter((_, i) => i !== index))}>
                        x
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Row>
                <Col md={6}>
                  <Form.Group className="floating-label-group mb-3 mt-3">
                    <Form.Control
                      className="floating-input"
                      type="number"
                      size="sm"
                      placeholder=""
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      onFocus={() => setDiscount('')}
                        onWheel={(e) => e.target.blur()}
                          inputMode="none"
                    />
                    <Form.Label className="floating-label">Discount</Form.Label>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="floating-label-group mb-3 mt-3">
                        <Form.Control
                          placeholder=""
                          className="floating-input"
                          type="number"
                          size="sm"
                          value={transportCost}
                          onChange={(e) => setTransportCost(Number(e.target.value))}
                          onFocus={() => setTransportCost('')}
                            onWheel={(e) => e.target.blur()}
                          inputMode="none"
                        />
                        <Form.Label className="floating-label">Transport Fee</Form.Label>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="floating-label-group mb-3 mt-3">
                        <Form.Control
                          placeholder=""
                          className="floating-input"
                          type="number"
                          size="sm"
                          value={laborCost}
                          onChange={(e) => setLaborCost(Number(e.target.value))}
                          onFocus={() => setLaborCost('')}
                            onWheel={(e) => e.target.blur()}
                          inputMode="none"F
                        />
                        <Form.Label className="floating-label">Labour Cost</Form.Label>
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        {/* <Form.Label>Select Method</Form.Label> */}
                        <SmallSelect
                          required={true}
                          options={cashOption}
                          placeholder="Select Method"
                          onChange={(selected) => setSelectedPayment(selected)}
                        />
                      </Form.Group>
                    </Col>
                    {selectedPayment && selectedPayment.value === 1 ? null : (
                      <Col md={6}>
                        <Form.Group className="floating-label-group mb-3">
                          <Form.Control
                            className="floating-input"
                            size="sm"
                            type="text"
                            placeholder=""
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value)}
                            onFocus={() => setTrxId('')}
                          />
                          <Form.Label className="floating-label">Transaction Id</Form.Label>
                        </Form.Group>
                      </Col>
                    )}
                  </Row>

                  <Form.Group className="floating-label-group mb-3">
                    <Form.Control
                      className="floating-input"
                      size="sm"
                      type="number"
                      placeholder=""
                      value={paidAmount}
                      onChange={(e) => setPaidAmount(Number(e.target.value))}
                      onFocus={() => setPaidAmount('')}
                    />
                    <Form.Label className="floating-label">paid</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <table className="overview-table">
                    <tbody>
                      <tr>
                        <td className="text-bold">Total price</td>
                        <td className="text-bold color-beguni">{totalAmount ? totalAmount : 0}</td>
                      </tr>
                      <tr>
                        <td>discount</td>
                        <td className="">{discount ? discount : 0}</td>
                      </tr>
                      <tr>
                        <td>Labor cost</td>
                        <td className="">{finalLaborCost}</td>
                      </tr>
                      <tr>
                        <td>Transport cost</td>
                        <td className="">{finalTransportCost}</td>
                      </tr>
                      <tr>
                        <td className="text-bold">After discount</td>
                        <td className="text-bold">{discountedAmount ? discountedAmount : 0}</td>
                      </tr>
                      <tr>
                        <td>Paid amount</td>
                        <td className="text-bold color-green">{paidAmount ? paidAmount : 0}</td>
                      </tr>
                      <tr>
                        <td>Due amount</td>
                        <td className="text-bold color-red">{dueAmount ? dueAmount : 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Button variant="primary" type="submit" size="sm">
                Submit
              </Button>
              <Button variant="secondary" type="button" onClick={clearAll} size="sm">
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MakeInvoice;
