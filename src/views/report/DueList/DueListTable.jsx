import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';

import SmallSelect from '../../../components/CustomSelect/SmallSelect';
import ReportHeader from '../../../components/PrintHeader/ReportHeader';

import {
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronRight,
  IconChevronsRight,
  IconPrint,
  IconFile,
  IconLibreOffice,
  IconRepeat
} from '../../../assets/icon';
const columns = [
  { Header: 'SL', accessor: (row, i) => i + 1 },
  {
    Header: 'Date',
    accessor: 'created_at'
  },
  {
    Header: 'Customer Info',
    accessor: (row) => `${row.name_en}, ${row.primary_phone}`,
    Cell: ({ cell: { value } }) => (
      <div className="customer-tr-info">
        <div>
          <span className="fw-bold">Name :</span>
          {value.split(', ')[0]}
        </div>
        <div>
          <span className="fw-bold">Phone:</span> {value.split(', ')[1]}
        </div>
      </div>
    )
  },
  { Header: 'Total Price', accessor: 'total_final_price' },
  { Header: 'Paid', accessor: 'total_paid' },
  { Header: 'Due ', accessor: 'total_due' }
];

const DueListTable = ({
  handlePrint,
  tableRef,
  data,
  loading,
  selectedCustomerData,
  selectedOption,
  handleSelectChange,
  allCustomersLoading,
  searchTerm,
  handleSearchChange,
  handleClearFilters,
  selectedAreaOption,
  handleSelectAreaChange,
  selectedAreasData
}) => {
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

  const totals = data.reduce(
    (acc, row) => {
      acc.total_final_price += row.total_final_price || 0;
      acc.total_paid += row.total_paid || 0;
      acc.total_due += row.total_due || 0;
      return acc;
    },
    { total_final_price: 0, total_paid: 0, total_due: 0 }
  );

  const handlePrintClick = () => {
    setPrintMode(true);
    setTimeout(() => {
      handlePrint();
      setPrintMode(false);
    }, 1000);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Define headers including 'SL'
    const headers = [...columns.map((col) => col.Header)];

    // Prepare body data including the SL column
    const body = data.map((row, index) => {
      return [
        ...columns.map((col) => {
          // Access the value based on accessor
          const accessor = col.accessor;
          // Handle different types of accessors
          if (typeof accessor === 'function') {
            return accessor(row, index); // Handle function accessors
          } else {
            return row[accessor] !== undefined ? row[accessor] : ''; // Handle direct accessors
          }
        })
      ];
    });

    doc.autoTable({
      head: [headers],
      body: body
    });

    doc.save('due-list.pdf');
  };

  const exportToExcel = () => {
    // Define headers including 'SL'
    const headers = [...columns.map((col) => col.Header)];

    // Prepare body data including the SL column
    const body = data.map((row, index) => {
      return {
        SL: index + 1, // SL column
        ...columns.reduce((acc, col) => {
          const accessor = col.accessor;
          // Handle different types of accessors
          if (typeof accessor === 'function') {
            acc[col.Header] = accessor(row, index); // Handle function accessors
          } else {
            acc[col.Header] = row[accessor] !== undefined ? row[accessor] : ''; // Handle direct accessors
          }
          return acc;
        }, {})
      };
    });

    // Convert body data to worksheet
    const worksheet = utils.json_to_sheet(body, { header: headers });

    // Create workbook and add worksheet
    const workbook = {
      Sheets: { 'Due List': worksheet },
      SheetNames: ['Due List']
    };

    // Write workbook to file
    writeFile(workbook, 'due-list.xlsx');
  };

  return (
    <div className="table-container">
      <div className="action-container mb-3">
        <Row>
          <Col md={9}>
            <Row>
              <Col md={6}>
                <Form.Group className="floating-label-group mb-3">
                  <Form.Control
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="floating-input"
                    size="sm"
                    type="text"
                    placeholder=""
                  />
                  <Form.Label className="floating-label">Search (Any)</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6}>
                <SmallSelect
                  value={selectedAreaOption}
                  onChange={handleSelectAreaChange}
                  options={selectedAreasData}
                  placeholder="এরিয়া সিলেক্ট"
                  header={true}
                  headerLeftText="এরিয়া"
                  headerRightText="নোট"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <SmallSelect
                    options={selectedCustomerData}
                    placeholder="কাস্টমার সিলেক্ট"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    isLoading={allCustomersLoading}
                    header={true}
                    required={true}
                    headerLeftText="কাস্টমার নাম"
                    headerRightText="এরিয়া"
                  />
                </Form.Group>
              </Col>
              <Col md={4}></Col>
              <Col md={4}>
                <Button variant="primary" size="sm" className="print-button w-100" onClick={handleClearFilters} disabled={loading}>
                  <IconRepeat /> <span className="ms-1">Reset Filter</span>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md={3}>
            <div className="action-btn">
              <Button variant="primary" size="sm" className="print-button" onClick={handlePrintClick} disabled={loading}>
                <IconPrint /> <span className="ms-1">Print</span>
              </Button>
              <Button variant="primary" size="sm" className="pdf-button" onClick={exportToPDF} disabled={loading}>
                <IconFile /> <span className="ms-1">Save as PDF</span>
              </Button>
              <Button variant="primary" size="sm" className="excel-button" onClick={exportToExcel} disabled={loading}>
                <IconLibreOffice /> <span className="ms-1">Save as Excel</span>
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div ref={tableRef} className="table-wrapper">
        <ReportHeader />
        <h4 className="text-center table-header">বাকির রিপোর্ট</h4>
        <table {...getTableProps()} className="invoice-table">
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
            <tr className="total-header">
              <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                Total
              </td>
              <td className="fw-bold text-primary p-2">{totals.total_final_price.toFixed(2)}</td>
              <td className="fw-bold text-primary p-2">{totals.total_paid.toFixed(2)}</td>
              <td className="fw-bold text-primary p-2">{totals.total_due.toFixed(2)}</td>
            </tr>
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
              <IconChevronsLeft />
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <IconChevronLeft />
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <IconChevronRight />
            </button>
            <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
              <IconChevronsRight />
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
