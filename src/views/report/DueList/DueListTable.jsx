import React from 'react';
import { useTable, usePagination } from 'react-table';
import ReportHeader from '../../../components/PrintHeader/ReportHeader';

const data = [
  { name: 'Katelyn Huber', address: 'Id dolor minus omni', previousBalance: 6760, sales: 6904, totalBill: 0, discount: 6914, due: -65 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 },
  { name: 'joshim', address: 'shiabazzir', previousBalance: 1650, sales: 1650, totalBill: 0, discount: 1400, due: 1400 }
];

const columns = [
  { Header: 'SL', accessor: (row, i) => i + 1 },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Address', accessor: 'address' },
  { Header: 'Previous Balance', accessor: 'previousBalance' },
  { Header: 'Sales', accessor: 'sales' },
  { Header: 'Total Bill', accessor: 'totalBill' },
  { Header: 'Discount', accessor: 'discount' },
  { Header: 'Due', accessor: 'due' }
];

const DueListTable = ({ handlePrint, tableRef }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
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

  return (
    <div className="table-container">
      <button className="print-button" onClick={handlePrint}>
        Print
      </button>
      <div ref={tableRef}>
        <ReportHeader />
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
            {page.map((row, i) => {
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
    </div>
  );
};

export default DueListTable;
