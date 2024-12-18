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

import { moneyFixed } from '../../../utils/moneyFixed';

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

  const MAX_PRODUCT_SELECTION = 10; // Global variable for max product selection

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
    if (selected && tradeProducts.length >= MAX_PRODUCT_SELECTION) {
      toastAlert('error', 'You can only select up to 10 products.');
      return;
    }

    if (selected) {
      let initialBagSize = '1KG';
      if (selected?.check_stock_50) {
        initialBagSize = '50KG';
      } else if (selected?.check_stock_25) {
        initialBagSize = '25KG';
      } else if (selected?.check_stock_10) {
        initialBagSize = '10KG';
      } else if (selected?.check_stock_5) {
        initialBagSize = '5KG';
      }

      const initialTotalPrice = selected.sell_price * getBagSizeMultiplier(initialBagSize);
      const availableStock = getAvailableStock(selected?.value, initialBagSize);

      // Check if there's available stock before proceeding
      if (availableStock <= 0) {
        toastAlert('error', 'No Stock');
        return;
      }

      const newProduct = {
        ...selected,
        quantity: 1,
        price: selected?.sell_price,
        totalPrice: initialTotalPrice,
        bagSize: initialBagSize,
        availableStock
      };

      setTradeProducts((prevTradeProducts) => {
        const updatedTradeProducts = [...prevTradeProducts, newProduct];
        return updatedTradeProducts;
      });

      setTimeout(() => {
        handleBagSizeChange(tradeProducts?.length, initialBagSize); // Trigger handleBagSizeChange initially
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

  const getAvailableStock = (productId, bagSize) => {
    const product = products.find((p) => p.id === productId);

    if (!product) return 0;

    // Get stock based on bagSize
    let availableStock = 0;
    switch (bagSize) {
      case '1KG':
        availableStock = product.stock_1;
        break;
      case '5KG':
        availableStock = product.stock_5;
        break;
      case '10KG':
        availableStock = product.stock_10;
        break;
      case '25KG':
        availableStock = product.stock_25;
        break;
      case '50KG':
        availableStock = product.stock_50;
        break;
      default:
        availableStock = 0;
    }

    return availableStock;
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...tradeProducts];

    // Convert value to integer
    let quantity = parseInt(value, 10);

    // Restrict quantity to be within 1 and availableStock
    if (quantity > updatedProducts[index].availableStock) {
      quantity = updatedProducts[index].availableStock;
    } else if (quantity < 1 || isNaN(quantity)) {
      quantity = 1;
    }

    // Update the product quantity
    updatedProducts[index].quantity = quantity;

    // Calculate the total price based on the updated quantity
    const bagSizeMultiplier = getBagSizeMultiplier(updatedProducts[index].bagSize);
    updatedProducts[index].totalPrice = quantity * updatedProducts[index].price * bagSizeMultiplier;

    // Update the state with the new product details
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
    const selectedProduct = tradeProducts[index];
    const availableStock = getAvailableStock(selectedProduct.value, value);

    const updatedProducts = [...tradeProducts];
    if (updatedProducts[index]) {
      updatedProducts[index].bagSize = value;
      updatedProducts[index].availableStock = availableStock;
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
        stock_1: product.bagSize === '1KG' ? parseFloat(product.quantity) : 0,
        stock_5: product.bagSize === '5KG' ? parseFloat(product.quantity) : 0,
        stock_10: product.bagSize === '10KG' ? parseFloat(product.quantity) : 0,
        stock_25: product.bagSize === '25KG' ? parseFloat(product.quantity) : 0,
        stock_50: product.bagSize === '50KG' ? parseFloat(product.quantity) : 0
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
    setSelectedPayment(cashOption[0]);
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
            <div className="table-responsive-wrapper">
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
                      <td>
                        {product.label} ({product.name})
                      </td>
                      <td>
                        <Form.Control
                          className="parches-control-form"
                          id="mySelect"
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
                      <td>{product.availableStock} ব্যাগ</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Form.Control
                            className="invoice-input parches-control-form"
                            type="number"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            inputMode="none"
                            min="1"
                            max={product.availableStock}
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
                          onChange={(e) => handlePriceChange(index, parseFloat(e.target.value))}
                          onWheel={(e) => e.target.blur()}
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                          disabled
                        />
                      </td>
                      <td className="text-end">
                        <span className="fw-bold h6 text-primary">{moneyFixed(product.totalPrice)}</span>
                      </td>
                      <td>
                        <Button size="sm" variant="danger" onClick={() => setTradeProducts(tradeProducts.filter((_, i) => i !== index))}>
                          x
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
                      onChange={(e) => setDiscount(parseFloat(e.target.value))}
                      onFocus={() => setDiscount('')}
                      onWheel={(e) => e.target.blur()}
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                    />
                    <Form.Label className="floating-label">ডিসকাউন্ট</Form.Label>
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
                          onChange={(e) => setTransportCost(parseFloat(e.target.value))}
                          onFocus={() => setTransportCost('')}
                          onWheel={(e) => e.target.blur()}
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                        />
                        <Form.Label className="floating-label">ট্রান্সপোর্ট খরচ</Form.Label>
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
                          onChange={(e) => setLaborCost(parseFloat(e.target.value))}
                          onFocus={() => setLaborCost('')}
                          onWheel={(e) => e.target.blur()}
                          inputMode="decimal"
                          min="0"
                          step="0.01"
                        />
                        <Form.Label className="floating-label">লেবার খরচ</Form.Label>
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
                          value={selectedPayment}
                          placeholder="Select Method"
                          onChange={(selected) => setSelectedPayment(selected)}
                        />
                      </Form.Group>
                    </Col>
                    {!selectedPayment || (selectedPayment && selectedPayment.value !== 1) ? (
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
                          <Form.Label className="floating-label">ট্রানজেকশন আইডি</Form.Label>
                        </Form.Group>
                      </Col>
                    ) : null}
                  </Row>

                  <Form.Group className="floating-label-group mb-3">
                    <Form.Control
                      className="floating-input"
                      size="sm"
                      type="number"
                      placeholder=""
                      value={paidAmount}
                      onChange={(e) => setPaidAmount(parseFloat(e.target.value))}
                      onFocus={() => setPaidAmount('')}
                      min="0"
                      inputMode="decimal"
                      step="0.01"
                    />
                    <Form.Label className="floating-label">paid</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={2}></Col>
                <Col md={4}>
                  <div className="overview-table-wrapper">
                    <table className="overview-table">
                      <tbody>
                        <tr>
                          <td className="text-bold">মোট মূল্য</td>
                          <td className="text-bold color-beguni">{moneyFixed(totalAmount ? totalAmount : 0)}</td>
                        </tr>
                        <tr>
                          <td>ডিসকাউন্ট</td>
                          <td className="">{moneyFixed(discount ? discount : 0)}</td>
                        </tr>
                        <tr>
                          <td>লেবার খরচ</td>
                          <td className="">{moneyFixed(finalLaborCost)}</td>
                        </tr>
                        <tr>
                          <td>ট্রান্সপোর্ট খরচ</td>
                          <td className="">{moneyFixed(finalTransportCost)}</td>
                        </tr>
                        <tr>
                          <td className="text-bold">সর্বমোট মূল্য</td>
                          <td className="text-bold">{moneyFixed(discountedAmount ? discountedAmount : 0)}</td>
                        </tr>
                        <tr>
                          <td>জমার পরিমান</td>
                          <td className="text-bold color-green">{moneyFixed(paidAmount ? paidAmount : 0)}</td>
                        </tr>
                        <tr>
                          <td>বাকীর পরিমান</td>
                          <td className="text-bold color-red">{moneyFixed(dueAmount ? dueAmount : 0)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
              <Button variant="primary" type="submit" size="sm" disabled={makeTradeLoading}>
                সাবমিট
              </Button>
              <Button variant="primary" type="submit" size="sm" disabled={makeTradeLoading}>
                সাবমিট ও প্রিন্ট
              </Button>
              <Button variant="secondary" type="button" onClick={clearAll} size="sm" disabled={makeTradeLoading}>
                ক্লিয়ার
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MakeInvoice;
