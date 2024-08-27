import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import ConfigForm from '../../components/Form/ConfigForm';

const SmsConfigModal = ({ show, handleClose, option = 'sms' }) => {
  const [formValues, setFormValues] = useState({
    smsLocalUrl: 'http://192.168.0.147:8080',
    smsPublicUrl: 'http://103.181.163.105:8080',
    smsCloudUrl: 'https://sms.capcom.me:443/api/3rdparty/v1'
  });
  console.log('🚀 ~ SmsConfigModal ~ formValues:', formValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered className="sms-config-modal">
      <Modal.Header closeButton>
        <Modal.Title>SMS Server Credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {option === 'sms' ? (
          <>
            <ConfigForm
              label="SMS Local URL"
              name="smsLocalUrl"
              value={formValues.smsLocalUrl}
              initialValue="sds"
              onChange={handleInputChange}
              placeholder="Enter SMS Local URL"
            />
            <ConfigForm
              label="SMS Public URL"
              name="smsApiKey"
              value={formValues.smsPublicUrl}
              initialValue="sds"
              onChange={handleInputChange}
              placeholder="Enter SMS Public URL"
            />
            <ConfigForm
              label="SMS Cloud URL"
              name="smsSenderId"
              value={formValues.smsCloudUrl}
              initialValue="sds"
              onChange={handleInputChange}
              placeholder="Enter SMS Cloud URL"
            />
          </>
        ) : (
          <div></div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SmsConfigModal;
