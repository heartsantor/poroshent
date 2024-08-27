import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { IconCheck, IconEdit, IconX } from '../../assets/icon';

const ConfigForm = ({ label, name, value, initialValue, onChange, placeholder }) => {
  const [makeEdit, setMakeEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onChange(e);
  };

  const onEdit = () => {
    setMakeEdit(true);
  };

  const onCancelEdit = () => {
    setMakeEdit(false);
    setInputValue(initialValue); // Reset input value to original on cancel
  };

  return (
    <Form.Group className="row mb-3">
      <Form.Label className="col-sm-3 col-form-label">{label}</Form.Label>
      <div className="col-sm-6">
        <input
          className="form-control"
          placeholder={placeholder}
          type="text"
          value={inputValue}
          name={name}
          onChange={handleInputChange}
          disabled={!makeEdit}
        />
      </div>
      <div className="col-sm-3 text-end">
        {makeEdit ? (
          <Button variant="secondary" size="sm" onClick={onCancelEdit}>
            <IconX />
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={onEdit}>
            <IconEdit />
          </Button>
        )}

        <Button variant="primary" size="sm" disabled={!makeEdit}>
          <IconCheck />
        </Button>
      </div>
    </Form.Group>
  );
};

export default ConfigForm;
