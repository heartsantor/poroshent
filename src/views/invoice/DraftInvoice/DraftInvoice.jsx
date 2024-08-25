import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { toast } from 'react-toastify';
import { Row, Col, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import {
  useAllCustomersMutation,
  useSingleCustomerMutation,
  useGetSingleCustomerDuesMutation
} from '../../../store/features/customer/customerApi';
import {
  useMakeTranjectionByCustomerMutation,
  useMakeTranjectionByTradeMutation
} from '../../../store/features/transaction/transactionApi';

import { toastAlert } from '../../../utils/AppHelpers';
import SmallSelect from '../../../components/CustomSelect/SmallSelect';
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

const radios = [
  { name: 'ড্রাফট বিল', value: 'draft' },
  { name: ' ইনভয়েস বিল ', value: 'invoice' }
];

const DraftInvoice = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [allCustomers, { isLoading: allCustomersLoading }] = useAllCustomersMutation();
  const [singleCustomers, { isLoading: singleCustomersLoading }] = useSingleCustomerMutation();
  const [getSingleCustomerDues, { isLoading: customerDuesLoading }] = useGetSingleCustomerDuesMutation();

  const [makeTransectionByCustomer, { isLoading: transectionByCustomerLoading }] = useMakeTranjectionByCustomerMutation();
  const [makeTransectionByTrade, { isLoading: transectionByTradeLoading }] = useMakeTranjectionByTradeMutation();

  const [startDate, setStartDate] = useState(new Date());
  const [customersData, setCustomersData] = useState([]);
  const [singleCustomersDate, setSingleCustomersDate] = useState({});
  const [singleCustomersDueDate, setSingleCustomersDueDate] = useState({});

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCashOption, setSelectedCashOption] = useState(null);
  const [selectedTradeOption, setSelectedTradeOption] = useState(null);
  const [paidAmount, setPaidAmount] = useState(0);
  const [trxId, setTrxId] = useState('');
  const [trxDescription, setTrxDescription] = useState('');

  const [radioValue, setRadioValue] = useState('draft');

  const selectedCustomerData = (customersData || []).map((item) => ({
    value: item.id,
    label: item.primary_phone,
    name: item.name_en,
    note: item.area_en
  }));
  const selectedTradeData = (singleCustomersDueDate?.trades || []).map((item) => ({
    value: item.id,
    label: `Invoice Id :${item.id} |`,
    name: `paid: ${item.paid} Taka`,
    note: `Due: ${item.due} Taka`
  }));

  const handleChange = (e) => {
    const lang = e.currentTarget.value;
    setRadioValue(lang);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // toast.dismiss(toastId.current);
    const transactionData = {
      accessToken,
      customer_id: selectedOption?.value,
      amount: paidAmount,
      tranjection_type: selectedCashOption?.value,
      trx_id: trxId != '' ? trxId : null,
      trx_description: trxDescription != '' ? trxDescription : null
    };
    const transactionTradeData = {
      accessToken,
      trade_id: selectedTradeOption?.value,
      amount: paidAmount,
      tranjection_type: selectedCashOption?.value,
      trx_id: trxId != '' ? trxId : null,
      trx_description: trxDescription != '' ? trxDescription : null
    };

    if (radioValue === 'draft') {
      makeTransectionByCustomer(transactionData)
        .unwrap()
        .then((res) => {
          if (size(res)) {
            if (res.flag === 200) {
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
    }
    if (radioValue === 'invoice') {
      makeTransectionByTrade(transactionTradeData)
        .unwrap()
        .then((res) => {
          if (size(res)) {
            if (res.flag === 200) {
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
    }
  };

  const clearAll = () => {
    setRadioValue("draft")
    setPaidAmount(0);
    setTrxId('');
    setTrxDescription('');
    setSelectedCashOption(null);
    setSelectedTradeOption(null);
    setSelectedOption(null);
    setSingleCustomersDate({});
    setSingleCustomersDueDate({});
  };
  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title as="h5">Draft Invoice</Card.Title>
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
                    onChange={(selected) => setSelectedOption(selected)}
                    isLoading={allCustomersLoading}
                    header={true}
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <CustomerInfo customersDate={singleCustomersDate} customersDueDate={singleCustomersDueDate} />
              </Col>
            </Row>
            <ButtonGroup toggle>
              {radios.map((radio, idx) => (
                <ToggleButton
                  className="toggle-button"
                  key={idx}
                  id={`radioz-${idx}`}
                  type="radio"
                  size="lg"
                  variant={radioValue === radio.value ? 'primary' : 'light'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={handleChange}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <hr />
            <Row>
              {radioValue === 'invoice' ? (
                <Col md={6}>
                  <Form.Group className="">
                    <SmallSelect
                      options={selectedTradeData}
                      placeholder="Select One"
                      value={selectedTradeOption}
                      onChange={(selected) => setSelectedTradeOption(selected)}
                      isLoading={customerDuesLoading}
                      header={true}
                      required={true}
                    />
                  </Form.Group>
                </Col>
              ) : null}
              <Col md={6}>
                <Form.Group className="floating-label-group">
                  <Form.Control
                    className="floating-input"
                    placeholder=""
                    type="number"
                    size="sm"
                    required
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    onFocus={() => setPaidAmount('')}
                  />
                  <Form.Label className="floating-label">Paid Amount</Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <Form.Group className=" mb-3">
                  <SmallSelect
                    options={cashOption}
                    placeholder="Account Type"
                    value={selectedCashOption}
                    onChange={(selected) => setSelectedCashOption(selected)}
                    required={true}
                  />
                </Form.Group>
              </Col>
              {selectedCashOption && selectedCashOption?.value != 1 ? (
                <Col md={6}>
                  <Form.Group className="floating-label-group mb-3">
                    <Form.Control
                      className="floating-input"
                      placeholder=""
                      type="text"
                      size="sm"
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      onFocus={() => setTrxId('')}
                    />
                    <Form.Label className="floating-label">Transaction ID</Form.Label>
                  </Form.Group>
                </Col>
              ) : null}
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Received Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={trxDescription}
                    onChange={(e) => setTrxDescription(e.target.value)}
                    onFocus={() => setTrxDescription('')}
                  />
                </Form.Group>
              </Col>
            </Row>
            <>
              <Button size="sm" variant="primary" type="submit">
                Submit
              </Button>

              <Button size="sm" variant="secondary" onClick={clearAll}>
                Clear
              </Button>
            </>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DraftInvoice;
