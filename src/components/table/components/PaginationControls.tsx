import { memo } from 'react';

import { Table } from '@tanstack/react-table';

import { clx } from '@/utils/helper';

import { Dessert } from '../table.types';

interface PaginationControlsProps {
  table: Table<Dessert>;
  totalRows: number;
  pagination: { pageIndex: number; pageSize: number };
}

export const PaginationControls = memo(
  ({ table, totalRows, pagination }: PaginationControlsProps) => {
    const startRow = pagination.pageIndex * pagination.pageSize + 1;
    const endRow = Math.min(
      (pagination.pageIndex + 1) * pagination.pageSize,
      totalRows,
    );

    return (
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
          {startRow}-{endRow} of {totalRows}
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
    );
  },
);

PaginationControls.displayName = 'PaginationControls';
