import React, { useRef, useState, useEffect } from 'react';
import { size } from 'lodash';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

import { useAllCustomersMutation } from '../../../store/features/customer/customerApi';
import { useGetAllDuesMutation } from '../../../store/features/due/dueApi';
import { useAllAreasMutation } from '../../../store/features/area/areaApi';

import { formatDateAndTime } from '../../../utils/dateTime';

import DueListTable from './DueListTable';

const DueList = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const tableRef = useRef();

  const [getAllDues, { isLoading: isGetAllDuesLoading }] = useGetAllDuesMutation();
  const [allCustomers, { isLoading: allCustomersLoading }] = useAllCustomersMutation();
  const [getAllAreas, { isLoading: isGetAreasLoading }] = useAllAreasMutation();

  const [allDueData, setAllDueData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [allAreas, setAllAreas] = useState([]);
  const [selectedAreaOption, setSelectedAreaOption] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const selectedCustomerData = (customersData || []).map((item) => ({
    value: item.id,
    label: item.primary_phone,
    name: item.name_en,
    note: item.area_en
  }));

  const selectedAreasData = (allAreas || []).map((item) => ({
    value: item.id,
    label: item.area_name_bd,
    name: item.area_name_en,
    note: item.note
  }));

  const formatData = (data) => {
    return data.map((item) => ({
      ...item,
      created_at: item.created_at ? formatDateAndTime(item.created_at) : ''
    }));
  };

  const fetchAllDues = async () => {
    setLoading(true); // Start loading
    const data = {
      accessToken
    };
    try {
      const res = await getAllDues(data).unwrap();
      if (size(res)) {
        const formattedData = formatData(res?.customers ? res?.customers : []);
        setAllDueData(formattedData); // Filter data after formatting
      }
    } catch (error) {
      setAllDueData({});
      console.error('Error:', error);
    } finally {
      setLoading(false); // End loading
    }
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

  const fetchAreaData = async () => {
    const data = {
      accessToken: accessToken
    };
    try {
      const res = await getAllAreas(data).unwrap();
      if (size(res)) {
        setAllAreas(res.data);
      } else {
        setAllAreas([]);
      }
    } catch (error) {
      setAllAreas([]);
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAllDues();
    fetchAreaData();
    fetchCustomersData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedOption(null);
    setSelectedAreaOption(null);
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: `Due Report ${selectedOption !== null ? `-${selectedOption?.name} (${selectedOption?.value})` : ''}`,
    pageStyle: `
@page {
  size: A4 portrait;
  margin: 10mm;
}

@media print {
  body {
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
  }
  .table-container {
    margin: 0;
    box-shadow: none;
    padding: 0;
  }

  .pagination-controls,
  .print-button {
    display: none;
  }

  table {
    border: 1px solid #ddd;
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        text-transform: uppercase;

        th {
          padding: 5px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0px 5px;
          border: 1px solid #ddd;
          text-align: center;

          .customer-tr-info {
            text-align: left;
          }
        }
      }
    }
  }
}
    `
  });

  const filterData = (data) => {
    // Ensure that data is an array
    if (!Array.isArray(data)) return [];

    return data.filter((item) => {
      const matchesSearchTerm = searchTerm
        ? item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.primary_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.area_en.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesCustomerFilter = selectedOption ? item.customer_id === selectedOption.value : true;
      const matchesAreaFilter = selectedAreaOption ? item.area_en === selectedAreaOption.name : true;

      return matchesSearchTerm && matchesCustomerFilter && matchesAreaFilter;
    });
  };

  const data = filterData(allDueData);

  // if (isGetAllDuesLoading) {
  //   return <LoadingSpinner isInitialLoading={true} />;
  // }

  return (
    <div>
      <DueListTable
        handlePrint={handlePrint}
        tableRef={tableRef}
        data={data}
        loading={loading}
        selectedCustomerData={selectedCustomerData}
        selectedOption={selectedOption}
        handleSelectChange={(selected) => {
          setSelectedOption(selected);
        }}
        allCustomersLoading={allCustomersLoading}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleClearFilters={handleClearFilters}
        selectedAreaOption={selectedAreaOption}
        handleSelectAreaChange={(selected) => {
          setSelectedAreaOption(selected);
        }}
        selectedAreasData={selectedAreasData}
      />
    </div>
  );
};

export default DueList;
