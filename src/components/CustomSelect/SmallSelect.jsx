import React from 'react';
import Select, { components } from 'react-select';
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

const MenuList = (props) => {
  return (
    <components.MenuList {...props}>
      <div style={{ padding: '8px', borderBottom: '1px solid #ced4da', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#f4f7fa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>info</span>
          <span>Address</span>
        </div>
      </div>
      {props.children}
    </components.MenuList>
  );
};

const SmallSelect = ({
  options = [],
  placeholder = 'Select...',
  value,
  onChange,
  isLoading = false,
  header = false,
  required = false,
  ...props
}) => {
  const formatOptionLabel = ({ label, name, note }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <span style={{ flex: '1 1 auto' }}>
        {label} {name ? `(${name})` : ''}
      </span>
      <span style={{ flex: '1 1 auto', textAlign: 'right', paddingLeft: '1rem' }}>{note}</span>
    </div>
  );

  const filterOption = (option, inputValue) => {
    const { label, name, note } = option.data;
    const searchStr = `${label} ${name} ${note}`.toLowerCase();
    return searchStr.includes(inputValue.toLowerCase());
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      classNamePrefix="react-select"
      value={value}
      onChange={onChange}
      isLoading={isLoading}
      isDisabled={isLoading}
      formatOptionLabel={formatOptionLabel}
      getOptionValue={(option) => option.value}
      components={header ? { MenuList } : undefined}
      filterOption={filterOption}
      required={required}
      {...props}
    />
  );
};

SmallSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  header: PropTypes.bool,
  required: PropTypes.bool
};

export default SmallSelect;
