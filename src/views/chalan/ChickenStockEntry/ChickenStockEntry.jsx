import React, { useState, useEffect, useRef } from 'react';
import { size } from 'lodash';
import { Row, Col, Card, Form, Button, ButtonGroup, ToggleButton, Tabs, Tab, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { toastAlert } from '../../../utils/AppHelpers';
import { useTranslation } from 'react-i18next';
import { Chicken } from '../../../assets/icon';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import { useGetProductMutation, useGetSingleProductMutation } from '../../../store/features/product/productApi';
import { useTakeSupplyMutation, useAllSupplyMutation } from '../../../store/features/supply/supplyApi';

import SupplyTable from './SupplyTable';

const ChickenStockEntry = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const toastId = useRef(null);
  const { t } = useTranslation();

  const [getProduct, { isLoading: allProductLoading }] = useGetProductMutation();
  const [getSingleProduct, { isLoading: singleProductLoading }] = useGetSingleProductMutation();
  const [takeSupply, { isLoading: takeSupplyLoading }] = useTakeSupplyMutation();
  const [allSupply, { isLoading: allSupplyLoading, error: allSupplyErr }] = useAllSupplyMutation();

  const [startDate, setStartDate] = useState(new Date());

  // useEffect(() => {
  //   const getBangladeshDate = () => {
  //     const now = new Date();
  //     const utcNow = now.getTime() + now.getTimezoneOffset() * 60000;
  //     const bangladeshOffset = 6 * 60 * 60000; // Bangladesh is UTC+6
  //     const bangladeshDate = new Date(utcNow + bangladeshOffset);
  //     return bangladeshDate;
  //   };

  //   setStartDate(getBangladeshDate());
  // }, []);

  console.log('🚀 ~ ChickenStockEntry ~ startDate:', startDate);

  const [radioValue, setRadioValue] = useState('1');
  const [selectedOption, setSelectedOption] = useState(null);

  const [products, setProducts] = useState([]);
  const [allSupplyData, setAllSupplyData] = useState([]);
  const [singleProducts, setSingleProducts] = useState({});
  console.log('🚀 ~ ChickenStockEntry ~ singleProducts:', singleProducts);

  const [activeKey, setActiveKey] = useState('all');

  const [mutationData, setMutationData] = useState({
    stock_1: '',
    stock_5: '',
    stock_10: '',
    stock_25: '',
    stock_50: '',
    chalan_no: '',
    stock_price: 0,
    sell_price: 0,
    date: startDate
  });

  const selectedProductData = (products || []).map((item) => ({
    value: item.id,
    label: item.name_en,
    name: item.name
  }));

  const radios = [
    { icon: <Chicken />, name: `${t('chicken_food')}`, value: '1' },
    { icon: <Chicken />, name: `${t('fish_food')}`, value: '2' },
    { icon: <Chicken />, name: `${t('cattle_food')}`, value: '3' },
    { icon: <Chicken />, name: `${t('medicine')}`, value: '4' }
  ];

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const fetchAllSupplyData = async () => {
    const data = {
      accessToken: accessToken
    };
    try {
      const res = await allSupply(data).unwrap();
      if (res && res.data && Array.isArray(res.data)) {
        // Create a copy of the array before sorting
        const sortedData = [...res.data].sort((a, b) => b.id - a.id); // Adjust 'value' to the key you want to sort by
        setAllSupplyData(sortedData);
      } else {
        setAllSupplyData([]);
      }
    } catch (error) {
      setAllSupplyData([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAllSupplyData();
  }, []);

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
      sell_price: 0,
      date: startDate
    });
  };

  const createUpdatedData = (mutationData) => {
    const updatedData = {
      accessToken,
      product_id: selectedOption !== null ? selectedOption.value : '',
      chalan_no: mutationData.chalan_no,
      sell_price: mutationData.sell_price,
      stock_price: mutationData.stock_price,
      date: startDate
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
            fetchAllSupplyData();
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
        sell_price: 0,
        date: startDate
      });
    }
  }, [selectedOption]);

  useEffect(() => {
    setMutationData({
      stock_1: '',
      stock_5: '',
      stock_10: '',
      stock_25: '',
      stock_50: '',
      chalan_no: '',
      stock_price: singleProducts?.stock_price ?? 0,
      sell_price: singleProducts?.sell_price ?? 0
    });
  }, [selectedOption, singleProducts]);

  const productTableList = allSupplyErr ? (
    <div>No Data/ Error</div>
  ) : (
    <SupplyTable productData={allSupplyData} onDeleteSuccess={fetchAllSupplyData} activeKey={true} isLoading={allSupplyLoading} />
  );

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">{t('stock_entry')}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <div className="form-group w-100 mb-3">
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    id="datePicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control w-100"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <ButtonGroup className="mb-3 w-100">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className="text-capitalize"
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
                    placeholder={t('select_one')}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isLoading={allProductLoading}
                    required={true}
                  />
                </Form.Group>
                {size(singleProducts) ? (
                  <div className="">
                    <h5> সর্বমোট (KG)</h5>
                    <div className="px-2">
                      {singleProducts.stock_1 !== undefined && singleProducts.stock_1 !== null && mutationData.stock_1 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>1KG Bag</span>
                          <span>
                            1*{mutationData.stock_1} = {mutationData.stock_1 * 1} KG
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_5 !== undefined && singleProducts.stock_5 !== null && mutationData.stock_5 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>5KG Bag</span>
                          <span>
                            5*{mutationData.stock_5} = {mutationData.stock_5 * 5} KG
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_10 !== undefined && singleProducts.stock_10 !== null && mutationData.stock_10 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>10KG Bag</span>
                          <span>
                            10*{mutationData.stock_10} = {mutationData.stock_10 * 10} KG
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_25 !== undefined && singleProducts.stock_25 !== null && mutationData.stock_25 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>25KG Bag</span>
                          <span>
                            25*{mutationData.stock_25} = {mutationData.stock_25 * 25} KG
                          </span>
                        </div>
                      ) : null}
                      {singleProducts.stock_50 !== undefined && singleProducts.stock_50 !== null && mutationData.stock_50 > 0 ? (
                        <div className="d-flex align-content-center justify-content-between border-bottom pb-0 p-2">
                          <span>50KG Bag</span>
                          <span>
                            50* {mutationData.stock_50} = {mutationData.stock_50 * 50} KG
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <div className="text-end mt-2">
                      <h6 className="me-3 fw-bold text-primary">মোট = {totalSum} KG</h6>
                    </div>
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
                        প্রোডাক্ট নাম
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
                        প্রোডাক্ট নাম (বাংলা )
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
                        প্রোডাক্ট কোড
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
                          required
                          // onFocus={handleFocus}
                          value={mutationData.stock_1 === null ? '' : mutationData.stock_1}
                          onChange={(e) => setMutationData({ ...mutationData, stock_1: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          1KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">বর্তমানে স্টক রয়েছে</p>
                        <span className={`${singleProducts.stock_1 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_1 ?? 0} ব্যাগ)
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
                          required
                          // onFocus={handleFocus}
                          value={mutationData.stock_5 === null ? '' : mutationData.stock_5}
                          onChange={(e) => setMutationData({ ...mutationData, stock_5: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          5KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">বর্তমানে স্টক রয়েছে</p>
                        <span className={`${singleProducts.stock_5 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_5 ?? 0} ব্যাগ)
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
                          required
                          // onFocus={handleFocus}
                          value={mutationData.stock_10 === null ? '' : mutationData.stock_10}
                          onChange={(e) => setMutationData({ ...mutationData, stock_10: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          10KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">বর্তমানে স্টক রয়েছে</p>
                        <span className={`${singleProducts.stock_10 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_10 ?? 0} ব্যাগ)
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
                          required
                          // onFocus={handleFocus}
                          value={mutationData.stock_25 === null ? '' : mutationData.stock_25}
                          onChange={(e) => setMutationData({ ...mutationData, stock_25: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          25KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">বর্তমানে স্টক রয়েছে</p>
                        <span className={`${singleProducts.stock_25 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_25 ?? 0} ব্যাগ)
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
                          required
                          // onFocus={handleFocus}
                          value={mutationData.stock_50 === null ? '' : mutationData.stock_50}
                          onChange={(e) => setMutationData({ ...mutationData, stock_50: e.target.value ? Number(e.target.value) : 0 })}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          50KG
                        </Form.Label>
                      </Form.Group>
                      <div className="d-flex align-items-center ms-2 mb-3">
                        <p className="m-0 me-2">বর্তমানে স্টক রয়েছে</p>
                        <span className={`${singleProducts.stock_50 > 0 ? 'text-primary' : 'text-danger'}`}>
                          ({singleProducts.stock_50 ?? 0} ব্যাগ)
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
                    onFocus={() => setMutationData({ ...mutationData, stock_price: '' })}
                  />
                  <Form.Label className="floating-label">স্টক মূল্য (KG) </Form.Label>
                </Form.Group>
                {singleProducts.stock_price !== undefined && singleProducts.stock_price !== null ? (
                  <div className="d-flex align-items-center ms-2 mb-3 ">
                    <p className="m-0 me-2">বর্তমান নির্ধারিত মূল্য</p>
                    <span
                      className="text-primary pointer"
                      onClick={() => setMutationData({ ...mutationData, stock_price: singleProducts?.stock_price })}
                    >
                      ({singleProducts.stock_price} TK)
                    </span>
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
                    onFocus={() => setMutationData({ ...mutationData, sell_price: '' })}
                  />
                  <Form.Label className="floating-label">বিক্রয় মূল্য (KG)</Form.Label>
                </Form.Group>
                {singleProducts.sell_price !== undefined && singleProducts.sell_price !== null ? (
                  <div className="d-flex align-items-center ms-2 mb-3">
                    <p className="m-0 me-2">বর্তমান নির্ধারিত মূল্য</p>
                    <span
                      className="text-primary pointer"
                      onClick={() => setMutationData({ ...mutationData, sell_price: singleProducts?.sell_price })}
                    >
                      ({singleProducts.sell_price} TK)
                    </span>
                  </div>
                ) : null}
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control
                    name="chalan_no"
                    size="sm"
                    type="text"
                    placeholder=""
                    className="floating-input"
                    required
                    value={mutationData.chalan_no}
                    onChange={(e) => setMutationData({ ...mutationData, chalan_no: e.target.value })}
                  />
                  <Form.Label className="floating-label">চালান নম্বর</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={takeSupplyLoading}>
              সংরক্ষণ
            </Button>
            <Button variant="secondary" onClick={clearAll} disabled={takeSupplyLoading}>
              মুছুন
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h5 className="mt-4">প্রোডাক্ট লিস্ট</h5>
      <hr />
      <Tabs variant="pills" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        <Tab eventKey="all" title="All" className="custom-tab-content">
          {productTableList}
        </Tab>
        <Tab eventKey="1" title={t('chicken_food')} className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
        <Tab eventKey="2" title={t('fish_food')} className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
        <Tab eventKey="3" title={t('cattle_food')} className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
        <Tab eventKey="4" title={t('medicine')} className="custom-tab-content">
          {/* {productTableList} */}
        </Tab>
      </Tabs>
    </div>
  );
};

export default ChickenStockEntry;
