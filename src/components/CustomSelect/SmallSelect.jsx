import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '30px',
    fontSize: '12px',
    borderRadius: '0.25rem',
    borderColor: '#ced4da',
    boxShadow: 'none',
    backgroundColor: '#f4f7fa',
    '&:hover': {
      borderColor: '#ced4da'
    },
    height: '32px' // Set the height for small control
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 0.5rem'
  }),
  input: (provided) => ({
    ...provided,
    margin: '0'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#6c757d',
    fontSize: '12px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#495057'
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0.25rem',
    zIndex: '1000',
    fontSize: '12px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#6c757d' : state.isFocused ? '#e9ecef' : 'white',
    color: state.isSelected ? 'white' : '#495057',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: state.isSelected ? '#6c757d' : '#e9ecef',
      color: state.isSelected ? 'white' : '#495057'
    }
  })
};

const SmallSelect = ({ options = [], placeholder = 'Select...', value, onChange, isLoading = false, ...props }) => {
  const filterOption = ({ label, name }, inputValue) =>
    label.toLowerCase().includes(inputValue.toLowerCase()) || name.toLowerCase().includes(inputValue.toLowerCase());

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      classNamePrefix="react-select"
      value={value}
      onChange={onChange}
      isLoading={isLoading}
      getOptionLabel={(option) => `${option.label} (${option.name})`}
      getOptionValue={(option) => option.value}
    />
  );
};

SmallSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default SmallSelect;
