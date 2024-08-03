import React, { useState, useEffect, useRef } from 'react';
import { size } from 'lodash';
import { Row, Col, Card, Form, Button, ButtonGroup, ToggleButton, Tabs, Tab, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';

import { Chicken } from '../../../assets/icon';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import { useGetProductMutation, useGetSingleProductMutation } from '../../../store/features/product/productApi';
import { useTakeSupplyMutation } from '../../../store/features/supply/supplyApi';

const ChickenStockEntry = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const toastId = useRef(null);

  const [getProduct, { isLoading: allProductLoading }] = useGetProductMutation();
  const [getSingleProduct, { isLoading: singleProductLoading }] = useGetSingleProductMutation();
  const [takeSupply, { isLoading: takeSupplyLoading }] = useTakeSupplyMutation();

  const [startDate, setStartDate] = useState(new Date());

  const [radioValue, setRadioValue] = useState('1');
  const [selectedOption, setSelectedOption] = useState(null);

  const [products, setProducts] = useState([]);
  const [singleProducts, setSingleProducts] = useState({});

  const [activeKey, setActiveKey] = useState('1');

  const [mutationData, setMutationData] = useState({
    stock_1: '',
    stock_5: '',
    stock_10: '',
    stock_25: '',
    stock_50: '',
    chalan_no: '',
    stock_price: 0,
    sell_price: 0
  });

  const selectedProductData = (products || []).map((item) => ({
    value: item.id,
    label: item.name
  }));

  const radios = [
    { icon: <Chicken />, name: 'মুরগীর খাবার', value: '1' },
    { icon: <Chicken />, name: 'মাছের খাবার', value: '2' },
    { icon: <Chicken />, name: 'গরুর খাবার', value: '3' },
    { icon: <Chicken />, name: 'ঔষধ', value: '4' }
  ];

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const fetchProductData = async (type) => {
    const data = {
      accessToken: accessToken,
      type: type
    };
    try {
      const res = await getProduct(data).unwrap();
      if (size(res)) {
        setProducts(res.product);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
      console.error('Error:', error);
    }
  };

  const fetchSingleProductData = async (type) => {
    const data = {
      accessToken: accessToken,
      product_id: type
    };
    try {
      const res = await getSingleProduct(data).unwrap();
      if (size(res)) {
        setSingleProducts(res.product);
      } else {
        setSingleProducts([]);
      }
    } catch (error) {
      setSingleProducts([]);
      console.error('Error:', error);
    }
  };

  const clearAll = () => {
    setSelectedOption(null);
    setSingleProducts({});
    setRadioValue('1');
    setMutationData({
      stock_1: '',
      stock_5: '',
      stock_10: '',
      stock_25: '',
      stock_50: '',
      chalan_no: '',
      stock_price: 0,
      sell_price: 0
    });
  };

  const createUpdatedData = (mutationData) => {
    const updatedData = {
      accessToken,
      product_id: selectedOption !== null ? selectedOption.value : '',
      chalan_no: mutationData.chalan_no,
      sell_price: mutationData.sell_price,
      stock_price: mutationData.stock_price
    };

    const stockProperties = ['stock_1', 'stock_5', 'stock_10', 'stock_25', 'stock_50'];

    stockProperties.forEach((property) => {
      const value = mutationData[property];
      if (value !== null && value > 0) {
        updatedData[property] = value;
      }
    });

    return updatedData;
  };

  const calculateTotal = (data) => {
    const multipliers = {
      stock_1: 1,
      stock_5: 5,
      stock_10: 10,
      stock_25: 25,
      stock_50: 50
    };

    return Object.keys(multipliers).reduce((sum, key) => {
      return sum + (data[key] ? data[key] * multipliers[key] : 0);
    }, 0);
  };

  const updatedData = createUpdatedData(mutationData);
  const totalSum = calculateTotal(mutationData);
  console.log('🚀 ~ ChickenStockEntry ~ totalSum:', totalSum);
  console.log('🚀 ~ ChickenStockEntry ~ updatedData:', updatedData);

  const handleFocus = (e) => {
    e.target.value = ''; // Clear the input value when it gains focus
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss(toastId.current);

    takeSupply(updatedData)
      .unwrap()
      .then((res) => {
        if (size(res)) {
          if (res.flag === 200) {
            toastAlert('success', res.message);
            clearAll();
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

  useEffect(() => {
    fetchProductData(radioValue);
    setSelectedOption(null);
    setSingleProducts({});
  }, [radioValue]);

  useEffect(() => {
    if (selectedOption !== null) {
      fetchSingleProductData(selectedOption.value);
      setMutationData({
        stock_1: '',
        stock_5: '',
        stock_10: '',
        stock_25: '',
        stock_50: '',
        chalan_no: '',
        stock_price: 0,
        sell_price: 0
      });
    }
  }, [selectedOption]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">মুরগীর স্টক এন্ট্রি</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <div className="form-group w-100 mb-3">
                  <DatePicker id="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} className="form-control w-100" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <ButtonGroup className="mb-3 w-100">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      size="sm"
                      key={idx}
                      id={`radi-${idx}`}
                      type="radio"
                      variant="outline-secondary"
                      name="aa"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {/* {radio.icon} */}
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedProductData}
                    placeholder="Select One"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isLoading={allProductLoading}
                  />
                </Form.Group>
                {size(singleProducts) ? (
                  <div className="">
                    <h6> Total KG SUM</h6>
                    <div className="px-2">
                      {singleProducts.stock_1 !== undefined && singleProducts.stock_1 !== null && mutationData.stock_1 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>1KG</span>
                          <span>
                            1* {mutationData.stock_1} = {mutationData.stock_1 * 1}
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_5 !== undefined && singleProducts.stock_5 !== null && mutationData.stock_5 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>5KG</span>
                          <span>
                            5* {mutationData.stock_5} = {mutationData.stock_5 * 5}
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_10 !== undefined && singleProducts.stock_10 !== null && mutationData.stock_10 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>10KG</span>
                          <span>
                            10* {mutationData.stock_10} = {mutationData.stock_1 * 10}
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_25 !== undefined && singleProducts.stock_25 !== null && mutationData.stock_25 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>25KG</span>
                          <span>
                            25* {mutationData.stock_25} = {mutationData.stock_25 * 25}
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_50 !== undefined && singleProducts.stock_50 !== null && mutationData.stock_50 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>50KG</span>
                          <span>
                            50* {mutationData.stock_50} = {mutationData.stock_50 * 50}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <h4>total = {totalSum} KG</h4>
                  </div>
                ) : null}
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="floating-label-group mb-3">
                      <Form.Control
                        disabled
                        value={singleProducts.name_en || ''}
                        name="product-name"
                        size="sm"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <Form.Label name="product-name" className="floating-label">
                        Product name
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="floating-label-group mb-3">
                      <Form.Control
                        disabled
                        value={singleProducts.name || ''}
                        name="product-name-bd"
                        size="sm"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <Form.Label name="product-name-bd" className="floating-label">
                        Product Name (BD)
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="floating-label-group mb-3">
                      <Form.Control
                        disabled
                        value={singleProducts.code || ''}
                        name="product-name-bd"
                        size="sm"
                        type="text"
                        placeholder=""
                        className="floating-input"
                      />
                      <Form.Label name="product-name-bd" className="floating-label">
                        Product Code
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  {/* <Col md={4}>
                    <Form.Group className="mb-3">
                      <SmallSelect options={options} placeholder="Select One" value={selectedOption} onChange={handleSelectChange} />
                    </Form.Group>
                  </Col> */}
                </Row>
                <Row>
                  {singleProducts.check_stock_1 === 1 ? (
                    <Col md={3}>
                      <Form.Group className="floating-label-group">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          // onFocus={handleFocus}
                          value={mutationData.stock_1 === null ? '' : mutationData.stock_1}
                          onChange={(e) => setMutationData({ ...mutationData, stock_1: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          1KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">Available Stock</p>
                        <span className={`${singleProducts.stock_1 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_1 ?? 0} Bag)
                        </span>
                      </div>
                    </Col>
                  ) : null}
                  {singleProducts.check_stock_5 === 1 ? (
                    <Col md={3}>
                      <Form.Group className="floating-label-group">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          // onFocus={handleFocus}
                          value={mutationData.stock_5 === null ? '' : mutationData.stock_5}
                          onChange={(e) => setMutationData({ ...mutationData, stock_5: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          5KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">Available Stock</p>
                        <span className={`${singleProducts.stock_5 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_5 ?? 0} Bag)
                        </span>
                      </div>
                    </Col>
                  ) : null}
                  {singleProducts.check_stock_10 === 1 ? (
                    <Col md={3}>
                      <Form.Group className="floating-label-group">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          // onFocus={handleFocus}
                          value={mutationData.stock_10 === null ? '' : mutationData.stock_10}
                          onChange={(e) => setMutationData({ ...mutationData, stock_10: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          10KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">Available Stock</p>
                        <span className={`${singleProducts.stock_10 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_10 ?? 0} Bag)
                        </span>
                      </div>
                    </Col>
                  ) : null}
                  {singleProducts.check_stock_25 === 1 ? (
                    <Col md={3}>
                      <Form.Group className="floating-label-group">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          // onFocus={handleFocus}
                          value={mutationData.stock_25 === null ? '' : mutationData.stock_25}
                          onChange={(e) => setMutationData({ ...mutationData, stock_25: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          25KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">Available Stock</p>
                        <span className={`${singleProducts.stock_25 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_25 ?? 0} Bag)
                        </span>
                      </div>
                    </Col>
                  ) : null}
                  {singleProducts.check_stock_50 === 1 ? (
                    <Col md={3}>
                      <Form.Group className="floating-label-group">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          // onFocus={handleFocus}
                          value={mutationData.stock_50 === null ? '' : mutationData.stock_50}
                          onChange={(e) => setMutationData({ ...mutationData, stock_50: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          50KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">Available Stock</p>
                        <span className={`${singleProducts.stock_50 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_50 ?? 0} Bag)
                        </span>
                      </div>
                    </Col>
                  ) : null}
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="floating-label-group ">
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder=""
                    className="floating-input"
                    // onFocus={handleFocus}
                    value={mutationData.stock_price}
                    onChange={(e) => setMutationData({ ...mutationData, stock_price: Number(e.target.value) })}
                  />
                  <Form.Label className="floating-label">Stock Price (KG) </Form.Label>
                </Form.Group>
                {singleProducts.stock_price !== undefined && singleProducts.stock_price !== null ? (
                  <div className="d-flex align-items-center ms-2 mb-3">
                    <p className="m-0 me-2">previous Price</p>
                    <span className="text-primary">({singleProducts.stock_price} TK)</span>
                  </div>
                ) : null}
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group">
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder=""
                    className="floating-input"
                    // onFocus={handleFocus}
                    value={mutationData.sell_price}
                    onChange={(e) => setMutationData({ ...mutationData, sell_price: Number(e.target.value) })}
                  />
                  <Form.Label className="floating-label">Sell Price (KG)</Form.Label>
                </Form.Group>
                {singleProducts.sell_price !== undefined && singleProducts.sell_price !== null ? (
                  <div className="d-flex align-items-center ms-2 mb-3">
                    <p className="m-0 me-2">previous Price</p>
                    <span className="text-primary">({singleProducts.sell_price} TK)</span>
                  </div>
                ) : null}
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder=""
                    className="floating-input"
                    value={mutationData.chalan_no}
                    onChange={(e) => setMutationData({ ...mutationData, chalan_no: e.target.value })}
                  />
                  <Form.Label className="floating-label">Chalan No</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" onClick={handleSubmit} disabled={takeSupplyLoading}>
              সংরক্ষণ
            </Button>
            <Button variant="secondary" onClick={clearAll} disabled={takeSupplyLoading}>
              clear
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h5 className="mt-4">প্রোডাক্ট লিস্ট</h5>
      <hr />
      <Tabs variant="pills" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        <Tab eventKey="1" title="মুরগীর খাবার" className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
        <Tab eventKey="2" title="মাছের খাবার" className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
        <Tab eventKey="3" title="গরুর খাবার" className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
        <Tab eventKey="4" title="ঔষধ" className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default ChickenStockEntry;
