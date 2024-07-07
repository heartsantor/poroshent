import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import DueListTable from './DueListTable';

const DueList = () => {
  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: 'Table Portrait',
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
              padding: 5px;
              border-bottom: 1px solid #ddd;
              text-align: left;
            }
          }
        }
      }
    }
  `
  });

  return (
    <div>
      <DueListTable handlePrint={handlePrint} tableRef={tableRef} />
    </div>
  );
};

export default DueList;
