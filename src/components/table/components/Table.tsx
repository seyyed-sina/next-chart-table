'use client';
import { useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { clx } from '@/utils/helper';

import { tableColumns, tableData } from '../table.data';
import { Dessert } from '../table.types';

export const ReactTable = () => {
  const [data] = useState(() => [...tableData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const getSortLabelByOrder = (order: string) => {
    if (order === 'asc') {
      return 'Sort ascending';
    } else if (order === 'desc') {
      return 'Sort descending';
    } else {
      return 'Clear sort';
    }
  };

  const getSortLabel = (header: Header<Dessert, unknown>) =>
    header.column.getCanSort()
      ? getSortLabelByOrder(header.column.getNextSortingOrder().toString())
      : undefined;

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      pagination,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue: string) => {
      return row
        .getValue<string>(columnId)
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });

  const totalFilteredRows = table.getFilteredRowModel().rows.length;

  // Calculating the range of items currently displayed
  const startRow = pagination.pageIndex * pagination.pageSize + 1;
  const endRow = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    totalFilteredRows,
  );

  return (
    <div className="text-sm px-4 sm:px-8 items-center justify-center text-primary-100 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-5 mb-6 flex-wrap">
        <h1 className="text-center text-xl text-primary-100 font-bold">
          Nutrition Table
        </h1>
        <input
          type="search"
          value={globalFilter ?? ''}
          placeholder="Search deserts..."
          className="px-3 font-base text-black rounded focus:outline-0 min-w-[300px] bg-primary-100 focus:bg-white min-h-10"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={clx(
                      'p-3 text-left border-solid border-b-2 border-gray-400 text-sm md:text-base',
                      header.column.id === 'name' && 'min-w-96',
                      header.column.id === 'select' && 'w-10',
                      header.column.id !== 'select' &&
                        header.column.id !== 'name' &&
                        'min-w-24',
                    )}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={clx(
                          header.column.getCanSort() &&
                            'cursor-pointer select-none',
                        )}
                        role="button"
                        title={getSortLabel(header)}
                        onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={clx(
                  'transition-colors',
                  row.getIsSelected() && 'bg-primary-950',
                )}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-4 border-b border-solid border-gray-500 text-sm md:text-base">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={table.getVisibleLeafColumns().length}
                  className="p-5 text-center">
                  No deserts found
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      {totalFilteredRows > 0 && (
        <div className="flex items-center justify-end self-end gap-5 mt-6">
          Rows per page:
          <select
            className="appearance-none bg-transparent border border-solid border-gray-500 rounded focus:outline-0 px-4 py-1"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}>
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize} className="text-black">
                {pageSize}
              </option>
            ))}
          </select>
          <div>
            {startRow}-{endRow} of {totalFilteredRows}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <svg
                className={clx(
                  'size-8 text-primary-100 stroke-primary-100',
                  !table.getCanPreviousPage() && 'opacity-40',
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <svg
                className={clx(
                  'size-8 text-primary-100 stroke-primary-100',
                  !table.getCanNextPage() && 'opacity-40',
                )}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ReactTable.displayName = 'ReactTable';
