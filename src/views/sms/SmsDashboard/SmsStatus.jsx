import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { size } from 'lodash';

import { IconMessage, IconReload, IconSettings } from '../../../assets/icon';

import SmsConfigModal from '../../../components/Modal/SmsConfigModal';

import { useCheckDeviceStatusMutation } from '../../../store/features/sms/smsApi';
import { useServerUpdateMutation } from '../../../store/features/credentials/credentialsApi';
import { setServerActive } from '../../../store/features/credentials/credentialsSlice';

const radios = [
  { name: 'Local Server', value: 'local' },
  { name: 'Cloud Server', value: 'cloud' }
];

const SmsStatus = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { sms_server_active } = useSelector((state) => state.credentials.credentialData);

  const [checkDeviceStatus, { isLoading: isCheckDeviceStatusLoading }] = useCheckDeviceStatusMutation();
  const [serverUpdate, { isLoading: isServerUpdateLoading }] = useServerUpdateMutation();

  const [checkDevice, setCheckDevice] = useState({});

  const [radioValue, setRadioValue] = useState('local');
  const [showModal, setShowModal] = useState(false);

  // Store the initial value of radioValue
  const initialRadioValue = useRef(radioValue);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };

  const fetchCheckDeviceData = async (sms_url_option) => {
    const data = {
      accessToken: accessToken,
      sms_url_option: sms_url_option // local,public,cloud
    };
    try {
      const res = await checkDeviceStatus(data).unwrap();
      if (size(res)) {
        setCheckDevice(res?.data ? res?.data : {});
      }
    } catch (error) {
      console.error('Error:', error);
      setCheckDevice({});
    }
  };

  useEffect(() => {
    if (sms_server_active) {
      fetchCheckDeviceData(sms_server_active);
      setRadioValue(sms_server_active);
      initialRadioValue.current = sms_server_active; // Update initialRadioValue when sms_server_active is set
    }
  }, [sms_server_active]);

  const fetchServerUpdateData = async (sms_data) => {
    const data = {
      accessToken: accessToken,
      sms_server_active: sms_data // local / public / cloud
    };
    try {
      const res = await serverUpdate(data).unwrap();
      if (size(res)) {
        console.log('🚀 ~ fetchCheckDeviceData ~ res:', res);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (radioValue !== initialRadioValue.current) {
      fetchServerUpdateData(radioValue);
      dispatch(setServerActive(radioValue));
    }
  }, [radioValue]);

  const isActive = Object.keys(checkDevice).length > 0 ? true : false;

  return (
    <div>
      <Card>
        <Card.Body className="p-0" style={{ minHeight: '200px' }}>
          {/* <h4 className="mb-4">getItemName</h4> */}
          <div className="shadow-sm">
            <div className="d-flex align-items-center justify-content-between px-4 py-3">
              <div className="d-flex text-info align-items-center">
                <div className="d-flex align-items-center">
                  <span
                    style={{ width: '10px', height: '10px' }}
                    className={`${isActive ? 'bg-success' : 'bg-danger'} rounded-circle me-2`}
                  ></span>
                  <h5 className="m-0">{isActive ? 'Active' : 'Inactive'}</h5>
                </div>
                <div className="ms-2" style={{ cursor: 'pointer' }} onClick={() => fetchCheckDeviceData(sms_server_active)}>
                  <IconReload isLoading={isCheckDeviceStatusLoading} />
                </div>
              </div>
              <div>
                <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      className="toggle-button"
                      key={idx}
                      id={`radiosms-s-${idx}`}
                      type="radio"
                      size="sm"
                      variant={radioValue === radio.value ? 'primary' : 'light'}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                      disabled={isCheckDeviceStatusLoading || isServerUpdateLoading}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <div className="text-info" style={{ cursor: 'pointer' }} onClick={handleShow}>
                <IconSettings />
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center px-3 py-3">
            <div className="col-12">
              <div className="ms-2">
                <div className="d-flex">
                  <p className="m-0">
                    <span className="fw-bold me-2">{isActive ? checkDevice?.type : 'None'}</span>
                  </p>
                  <div className="rounded-2 bg-info px-2 py-0 text-white fw-bold mb-2" style={{ maxWidth: '100px', textAlign: 'center' }}>
                    SIM 1
                  </div>
                </div>
                <p className="m-0">
                  <span className="d-inline-block fw-bold me-2">Id: </span>
                  <span className="text-warning">{isActive ? checkDevice?.deviceStatus?.id : 'Inactive Device'}</span>
                </p>
                <p className="m-0">
                  <span className="d-inline-block fw-bold me-2">Device Name: </span>
                  <span className="text-warning">{isActive ? checkDevice?.deviceStatus?.name : 'Inactive Device'}</span>
                </p>
                <p className="m-0">
                  <span className="d-inline-block fw-bold me-2">Last Seen: </span>
                  <span className="text-warning">{isActive ? checkDevice?.deviceStatus?.lastSeen : 'Inactive Device'}</span>
                </p>
                <p className="m-0">
                  <span className="d-inline-block fw-bold me-2">Last Update: </span>
                  <span className="text-warning">{isActive ? checkDevice?.deviceStatus?.updatedAt : 'Inactive Device'}</span>
                </p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <SmsConfigModal show={showModal} handleClose={handleClose} />
    </div>
  );
};

export default SmsStatus;
