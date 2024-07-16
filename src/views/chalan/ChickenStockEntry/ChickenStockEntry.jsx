import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Row, Col, Card, Form, Button, ButtonGroup, ToggleButton, DropdownButton, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { Chicken } from '../../../assets/icon';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import { useGetProductMutation, useGetSingleProductMutation } from '../../../store/features/product/productApi';
import { useTakeSupplyMutation } from '../../../store/features/supply/supplyApi';

const ChickenStockEntry = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getProduct, { isLoading: allProductLoading }] = useGetProductMutation();
  const [getSingleProduct, { isLoading: singleProductLoading }] = useGetSingleProductMutation();
  const [takeSupply, { isLoading: takeSupplyLoading }] = useTakeSupplyMutation();

  const [startDate, setStartDate] = useState(new Date());

  const [radioValue, setRadioValue] = useState('1');
  const [selectedOption, setSelectedOption] = useState(null);

  const [products, setProducts] = useState([]);
  const [singleProducts, setSingleProducts] = useState({});

  const [mutationData, setMutationData] = useState({
    stock_1: 0,
    stock_5: 0,
    stock_10: 0,
    stock_25: 0,
    stock_50: 0,
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
  const updatedData = createUpdatedData(mutationData);
  console.log('🚀 ~ ChickenStockEntry ~ updatedData:', updatedData);

  const handleChange = (type, value) => {
    setMutationData((prevData) => ({
      ...prevData,
      [type]: value
    }));
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
            resetAfterSubmit();
            onDeleteSuccess(); // Refetch product data after successful deletion
            if (productId) {
              navigate('/chalan/product-name-entry');
            }
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
                    <Form.Group className="floating-label-group mb-3 ">
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
                    <Form.Group className="floating-label-group mb-3 ">
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
                  {singleProducts.stock_1 !== undefined && singleProducts.stock_1 !== null ? (
                    <Col md={3}>
                      <div className="d-flex align-items-center justify-content-between px-2">
                        <h6>Available Stock</h6>
                        <h6 className={`${singleProducts.stock_1 > 0 ? 'text-primary' : 'text-danger'}`}>{singleProducts.stock_1} Bag</h6>
                      </div>
                      <Form.Group className="floating-label-group mb-3 ">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          value={mutationData.stock_1}
                          onChange={(e) => handleChange('stock_1', e.target.value)}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          1KG
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  ) : null}
                  {singleProducts.stock_5 !== undefined && singleProducts.stock_5 !== null ? (
                    <Col md={3}>
                      <div className="d-flex align-items-center justify-content-between px-2">
                        <h6>Available Stock</h6>
                        <h6 className={`${singleProducts.stock_5 > 0 ? 'text-primary' : 'text-danger'}`}>{singleProducts.stock_5} Bag</h6>
                      </div>
                      <Form.Group className="floating-label-group mb-3 ">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          value={mutationData.stock_5}
                          onChange={(e) => handleChange('stock_5', e.target.value)}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          5KG
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  ) : null}
                  {singleProducts.stock_10 !== undefined && singleProducts.stock_10 !== null ? (
                    <Col md={3}>
                      <div className="d-flex align-items-center justify-content-between px-2">
                        <h6>Available Stock</h6>
                        <h6 className={`${singleProducts.stock_10 > 0 ? 'text-primary' : 'text-danger'}`}>{singleProducts.stock_10} Bag</h6>
                      </div>
                      <Form.Group className="floating-label-group mb-3 ">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          value={mutationData.stock_10}
                          onChange={(e) => handleChange('stock_10', e.target.value)}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          10KG
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  ) : null}
                  {singleProducts.stock_25 !== undefined && singleProducts.stock_25 !== null ? (
                    <Col md={3}>
                      <div className="d-flex align-items-center justify-content-between px-2">
                        <h6>Available Stock</h6>
                        <h6 className={`${singleProducts.stock_25 > 0 ? 'text-primary' : 'text-danger'}`}>{singleProducts.stock_25} Bag</h6>
                      </div>
                      <Form.Group className="floating-label-group mb-3 ">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          value={mutationData.stock_25}
                          onChange={(e) => handleChange('stock_25', e.target.value)}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          25KG
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  ) : null}
                  {singleProducts.stock_50 !== undefined && singleProducts.stock_50 !== null ? (
                    <Col md={3}>
                      <div className="d-flex align-items-center justify-content-between px-2">
                        <h6>Available Stock</h6>
                        <h6 className={`${singleProducts.stock_50 > 0 ? 'text-primary' : 'text-danger'}`}>{singleProducts.stock_50} Bag</h6>
                      </div>
                      <Form.Group className="floating-label-group mb-3 ">
                        <Form.Control
                          name="product-name-bd"
                          size="sm"
                          type="number"
                          placeholder=""
                          className="floating-input"
                          value={mutationData.stock_50}
                          onChange={(e) => handleChange('stock_50', e.target.value)}
                        />
                        <Form.Label name="product-name-bd" className="floating-label">
                          50KG
                        </Form.Label>
                      </Form.Group>
                    </Col>
                  ) : null}
                </Row>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder=""
                    className="floating-input"
                    value={mutationData.stock_price}
                    onChange={(e) => handleChange('stock_price', e.target.value)}
                  />
                  <Form.Label className="floating-label">Stock Price (KG) </Form.Label>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder=""
                    className="floating-input"
                    value={mutationData.sell_price}
                    onChange={(e) => handleChange('sell_price', e.target.value)}
                  />
                  <Form.Label className="floating-label">Sell Price (KG)</Form.Label>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="floating-label-group mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder=""
                    className="floating-input"
                    value={mutationData.chalan_no}
                    onChange={(e) => handleChange('chalan_no', e.target.value)}
                  />
                  <Form.Label className="floating-label">Chalan No</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary">সংরক্ষণ</Button>
            <Button variant="secondary" onClick={clearAll}>
              clear
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChickenStockEntry;
