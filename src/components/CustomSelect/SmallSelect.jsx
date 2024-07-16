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
    backgroundColor: state.isSelected ? '#66afe9' : state.isFocused ? '#e9ecef' : 'white',
    color: state.isSelected ? 'white' : '#495057',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: state.isSelected ? '#66afe9' : '#e9ecef',
      color: state.isSelected ? 'white' : '#495057'
    }
  })
};

const SmallSelect = ({ options, placeholder, ...props }) => {
  return <Select options={options} styles={customStyles} placeholder={placeholder} classNamePrefix="react-select" {...props} />;
};

SmallSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string
};

SmallSelect.defaultProps = {
  placeholder: 'Select...'
};

export default SmallSelect;
