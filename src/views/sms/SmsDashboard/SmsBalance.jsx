import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { size } from 'lodash';

import SmsConfigModal from '../../../components/Modal/SmsConfigModal';

import { useOperatorUpdateMutation } from '../../../store/features/credentials/credentialsApi';
import { setOperatorActive } from '../../../store/features/credentials/credentialsSlice';
import { useGetAllStatusMutation } from '../../../store/features/operator/operatorApi';

import { IconMessage, IconReload, IconSettings } from '../../../assets/icon';

const radios = [
  { name: 'gp', value: 'gp' },
  { name: 'bl', value: 'bl' },
  { name: 'teletalk', value: 'tel' },
  { name: 'robi', value: 'robi' }
];

const SmsBalance = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { sms_operator_active } = useSelector((state) => state.credentials.credentialData);
  console.log('🚀 ~ SmsBalance ~ sms_operator_active:', sms_operator_active);

  const [allStatus, { isLoading: isAllStatusLoading }] = useGetAllStatusMutation();
  const [operatorUpdate, { isLoading: isOperatorUpdateLoading }] = useOperatorUpdateMutation();

  const [radioValue, setRadioValue] = useState(sms_operator_active || 'gp');
  const [operatorData, setOperatorData] = useState({});
  console.log('🚀 ~ SmsBalance ~ operatorData:', operatorData);

  const initialRadioValue = useRef(radioValue);

  // Fetch operator data when radioValue changes
  const fetchOperatorData = async (operator) => {
    const data = {
      accessToken: accessToken,
      sms_operator_active: operator
    };
    try {
      const res = await allStatus(data).unwrap();
      if (size(res)) {
        setOperatorData(res?.data ? res?.data : {});
      }
    } catch (error) {
      console.error('Error:', error);
      setOperatorData({});
    }
  };

  useEffect(() => {
    if (sms_operator_active) {
      fetchOperatorData(sms_operator_active);
      setRadioValue(sms_operator_active);
      initialRadioValue.current = sms_operator_active; // Update initialRadioValue when sms_server_active is set
    }
  }, [sms_operator_active]);

  const fetchOperatorUpdateData = async (sms_data) => {
    const data = {
      accessToken: accessToken,
      sms_operator_active: sms_data // local / public / cloud
    };
    try {
      await operatorUpdate(data).unwrap();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (radioValue !== initialRadioValue.current) {
      fetchOperatorUpdateData(radioValue);
      dispatch(setOperatorActive(radioValue));
    }
  }, [radioValue]);

  const isActive = Object.keys(operatorData).length > 0 ? true : false;

  return (
    <div>
      <Card>
        <Card.Body className="p-0" style={{ minHeight: '200px' }}>
          {/* <h4 className="mb-4">getItemName</h4> */}
          <div className="shadow-sm">
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex text-info">
                <div className="d-flex align-items-center">
                  <span
                    style={{ width: '10px', height: '10px' }}
                    className={`${isActive ? 'bg-success' : 'bg-danger'} rounded-circle me-2`}
                  ></span>
                  <h5 className="m-0">{isActive ? 'Active' : 'Inactive'}</h5>
                </div>
                <div className="ms-2" style={{ cursor: 'pointer' }} onClick={() => fetchOperatorData(sms_operator_active)}>
                  <IconReload isLoading={isAllStatusLoading} />
                </div>
              </div>
              <div>
                <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className="toggle-button"
                      style={{ minWidth: '50px' }}
                      key={idx}
                      id={`radiosms-b-${idx}`}
                      type="radio"
                      size="sm"
                      variant={radioValue === radio.value ? 'primary' : 'light'}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <div className="text-info" style={{ cursor: 'pointer' }}>
                <IconSettings />
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center px-3 pt-2 pb-3">
            <div className="pb-1 d-flex align-items-center">
              <p className="m-0 mb-1 me-2">
                Number: <span className="fw-bold">{operatorData?.msisdn}</span>
              </p>
              <div className="rounded-2 bg-info px-2 py-0 text-white fw-bold mb-2" style={{ maxWidth: '150px', textAlign: 'center' }}>
                {operatorData?.operator}
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center">
                <div
                  className="me-2 bg-info rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px' }}
                >
                  <span className="text-white display-5">৳</span>
                </div>
                <div>
                  <p className="m-0">Balance</p>
                  <h3 className="f-w-600 d-flex align-items-center m-b-0">{operatorData?.balance} TK</h3>
                </div>
              </div>
            </div>
            <div className="col-6 text-end">
              <div className="d-flex align-items-start justify-content-end">
                <div className="">
                  <h4 className="f-w-600 m-b-0">
                    <span>{operatorData?.sms?.total}</span>SMS
                  </h4>
                  <p className="m-0">Any LocalNumber</p>
                  <p className="m-0">{operatorData?.sms?.validTill}</p>
                </div>
                <div className="ms-2">
                  <IconMessage />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-2 d-flex align-items-center"></div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SmsBalance;
