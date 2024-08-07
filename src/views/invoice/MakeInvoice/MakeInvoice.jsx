import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import { useAllCustomersMutation, useSingleCustomerMutation } from '../../../store/features/customer/customerApi';
import { useGetProductMutation } from '../../../store/features/product/productApi';
import { useMakeTradeMutation } from '../../../store/features/trade/tradeApi';

const MakeInvoice = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getProduct, { isLoading: allProductLoading }] = useGetProductMutation();
  const [allCustomers, { isLoading: allCustomersLoading }] = useAllCustomersMutation();
  const [singleCustomers, { isLoading: singleCustomersLoading }] = useSingleCustomerMutation();
  const [makeTrade, { isLoading: makeTradeLoading }] = useMakeTradeMutation();

  const [startDate, setStartDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [customersDate, setCustomersDate] = useState([]);
  const [singleCustomersDate, setSingleCustomersDate] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedProductOption, setSelectedProductOption] = useState(null);
  const [tradeProducts, setTradeProducts] = useState([]);
  console.log('🚀 ~ MakeInvoice ~ tradeProducts:', tradeProducts);
  const [discount, setDiscount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const selectedCustomerData = (customersDate || []).map((item) => ({
    value: item.id,
    label: item.primary_phone,
    name: item.name_en,
    note: item.area
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
    note: `${item.stock_1 > 0 ? `(1KG x ${item.stock_1})` : ''} 
    ${item.stock_5 > 0 ? `(5KG x ${item.stock_5})` : ''}
    ${item.stock_10 > 0 ? `(10KG x ${item.stock_10})` : ''}
    ${item.stock_25 > 0 ? `(25KG x ${item.stock_25})` : ''}
    ${item.stock_50 > 0 ? `(50KG x ${item.stock_50})` : ''} = ${item.stock_1 + item.stock_5 + item.stock_10 + item.stock_25 + item.stock_50} bag
    `
  }));

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleProductSelectChange = (selected) => {
    if (selected) {
      setTradeProducts([
        ...tradeProducts,
        {
          ...selected,
          quantity: 1,
          price: 0,
          totalPrice: 0,
          bagSize: '1KG'
        }
      ]);
      setSelectedProductOption(null); // Reset product selection
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await getProduct({ accessToken }).unwrap();
      setProducts(size(res) ? res.product : []);
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
      setCustomersDate(size(res) ? res.Customers : []);
    } catch (error) {
      setCustomersDate([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchSingleCustomersData = async (id) => {
    try {
      const res = await singleCustomers({ accessToken, customer_id: id }).unwrap();
      setSingleCustomersDate(size(res) ? res.customer : {});
    } catch (error) {
      setSingleCustomersDate({});
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
    updatedProducts[index].totalPrice = value * updatedProducts[index].price;
    setTradeProducts(updatedProducts);
  };

  const handlePriceChange = (index, value) => {
    const updatedProducts = [...tradeProducts];
    updatedProducts[index].price = value;
    updatedProducts[index].totalPrice = value * updatedProducts[index].quantity;
    setTradeProducts(updatedProducts);
  };

  const handleBagSizeChange = (index, value) => {
    const updatedProducts = [...tradeProducts];
    updatedProducts[index].bagSize = value;
    setTradeProducts(updatedProducts);
  };

  const totalAmount = tradeProducts.reduce((sum, product) => sum + product.totalPrice, 0);
  const discountedAmount = totalAmount - discount;
  const dueAmount = discountedAmount - paidAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tradeData = {
      accessToken,
      customer_id: selectedOption.value,
      given_discount: discount,
      paid_amount: paidAmount,
      tranjection_type: 1,
      products: tradeProducts.map((product) => ({
        product_id: product.value,
        stock_1: product.bagSize === '1KG' ? product.quantity : 0,
        stock_5: product.bagSize === '5KG' ? product.quantity : 0,
        stock_10: product.bagSize === '10KG' ? product.quantity : 0,
        stock_25: product.bagSize === '25KG' ? product.quantity : 0,
        stock_50: product.bagSize === '50KG' ? product.quantity : 0
      }))
    };
    try {
      await makeTrade(tradeData).unwrap();
      setTradeProducts([]);
      setDiscount(0);
      setPaidAmount(0);
      setSelectedOption(null);
      // Reset form or show success message
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Make Invoice</Card.Title>
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
                    placeholder="Select One"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isLoading={allCustomersLoading}
                    header={true}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={6}>
                    name: {singleCustomersDate.name}
                    <h6>due: {singleCustomersDate.credit}</h6>
                  </Col>
                  <Col md={6}>address: {singleCustomersDate.address}</Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedProductData}
                    placeholder="Select One"
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
                <tr>
                  <th>SL</th>
                  <th>Product Name</th>
                  <th>Bag size</th>
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
                      <Form.Control as="select" value={product.bagSize} onChange={(e) => handleBagSizeChange(index, e.target.value)}>
                        {product.check_stock_1 && <option value="1KG">1KG</option>}
                        {product.check_stock_5 && <option value="5KG">5KG</option>}
                        {product.check_stock_10 && <option value="10KG">10KG</option>}
                        {product.check_stock_25 && <option value="25KG">25KG</option>}
                        {product.check_stock_50 && <option value="50KG">50KG</option>}
                      </Form.Control>
                    </td>

                    <td>
                      <Form.Control type="number" value={product.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} />
                    </td>
                    <td>Bag</td>
                    <td>
                      <Form.Control type="number" value={product.price} onChange={(e) => handlePriceChange(index, e.target.value)} />
                    </td>
                    <td>{product.totalPrice}</td>
                    <td>
                      <Button variant="danger" onClick={() => setTradeProducts(tradeProducts.filter((_, i) => i !== index))}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Total price</td>
                        <td>{totalAmount}</td>
                      </tr>
                      <tr>
                        <td>Total discount</td>
                        <td>{discount}</td>
                      </tr>
                      <tr>
                        <td>After discount</td>
                        <td>{discountedAmount}</td>
                      </tr>
                      <tr>
                        <td>Paid amount</td>
                        <td>
                          <Form.Control type="number" value={paidAmount} onChange={(e) => setPaidAmount(Number(e.target.value))} />
                        </td>
                      </tr>
                      <tr>
                        <td>Due amount</td>
                        <td>{dueAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" type="button" onClick={() => setTradeProducts([])}>
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
