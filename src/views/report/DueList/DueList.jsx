import React, { useRef, useState, useEffect } from 'react';
import { size } from 'lodash';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useGetAllDuesMutation } from '../../../store/features/due/dueApi';
import { formatDateAndTime } from '../../../utils/dateTime';

import LoadingSpinner from '../../../components/Loader/LoadingSpinner';
import DueListTable from './DueListTable';

const DueList = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const tableRef = useRef();

  const [getAllDues, { isLoading: isGetAllDuesLoading }] = useGetAllDuesMutation();

  const [allDueData, setAllDueData] = useState([]);
  console.log('🚀 ~ DueList ~ allDueData:', allDueData);

  const [loading, setLoading] = useState(true);

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
        setAllDueData(formatData(res?.customers ? res?.customers : []));
      }
    } catch (error) {
      setAllDueData({});
      console.error('Error:', error);
    } finally {
      setLoading(false); // End loading
    }

  };

  useEffect(() => {
    fetchAllDues();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: 'Due Reports',
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 10mm;
      }
        
      @media print {
        .table-container {
          margin: 0;
          box-shadow: none;
          padding: 0;
        }
        .pagination-controls, .print-button {
          display: none;
        }
        table {
          border: 1px solid #ddd;
          width: 100%;
          border-collapse: collapse;

          thead {
            tr {
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
                padding: 2px 5px;
                border-bottom: 1px solid #ddd;
                text-align: left;
              }
            }
          }
        }
      }
    `
  });

  const data =
    allDueData.length > 0
      ? allDueData
      : [
          {
            customer_id: 0,
            name: '',
            name_en: '',
            primary_phone: '',
            secondary_phone: null,
            address: '',
            area: '',
            area_en: '',
            created_at: '',
            total_final_price: 0,
            total_paid: 0,
            total_due: 0
          }
        ];

  if (isGetAllDuesLoading) {
    return <LoadingSpinner isInitialLoading={true} />;
  }

  return (
    <div>
      <DueListTable handlePrint={handlePrint} tableRef={tableRef} data={data} loading={loading}/>
    </div>
  );
};

export default DueList;
