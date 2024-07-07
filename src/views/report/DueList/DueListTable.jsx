import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import ReportHeader from '../../../components/PrintHeader/ReportHeader';

const data = [
  {
    customer_name: 'Katelyn Huber',
    customer_address: 'Id dolor minus omni',
    pre_due: 6760,
    sales: 6904,
    total_bill: 0,
    return_sale: 6914,
    cash_amount: 0,
    discount: 0,
    due: -65
  },
  {
    customer_name: 'Katelyn Huber',
    customer_address: 'Id dolor minus omni',
    pre_due: 6760,
    sales: 6904,
    total_bill: 0,
    return_sale: 6914,
    cash_amount: 0,
    discount: 0,
    due: -65
  }
];

const columns = [
  { Header: 'SL', accessor: (row, i) => i + 1 },
  {
    Header: 'কাস্টমার তথ্য',
    accessor: (row) => `${row.customer_name}, ${row.customer_address}`,
    Cell: ({ cell: { value } }) => (
      <div>
        <strong>name :{value.split(', ')[0]}</strong>
        <div>address: {value.split(', ')[1]}</div>
      </div>
    )
  },
  { Header: 'পূর্বের বাকি', accessor: 'pre_due' },
  { Header: 'বিক্রয় ', accessor: 'sales' },
  { Header: 'মোট বিল', accessor: 'total_bill' },
  { Header: 'বিক্রয় ফেরত', accessor: 'return_sale' },
  { Header: 'আদায়', accessor: 'cash_amount' },
  { Header: 'ডিসকাউন্ট', accessor: 'discount' },
  { Header: 'বাকি', accessor: 'due' }
];

const DueListTable = ({ handlePrint, tableRef }) => {
  const [printMode, setPrintMode] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows, // Use all rows for printing
    page, // Only use page for normal display
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  const handlePrintClick = () => {
    setPrintMode(true);
    setTimeout(() => {
      handlePrint();
      setPrintMode(false);
    }, 1000);
  };

  return (
    <div className="table-container">
      <button className="print-button" onClick={handlePrintClick}>
        Print
      </button>
      <div ref={tableRef}>
        <ReportHeader />
        <h4 className='text-center'>বাকির রিপোর্ট</h4>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {(printMode ? rows : page).map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!printMode && (
        <div className="pagination-controls">
          <div className="d-flex gap-2">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>
            <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>
          </div>

          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DueListTable;
