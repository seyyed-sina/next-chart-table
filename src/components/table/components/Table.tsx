'use client';
import { useState, useCallback, useMemo } from 'react';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { tableColumns, tableData } from '../table.data';
import { PaginationControls } from './PaginationControls';
import { TableBody } from './TableBody';
import { TableFilterInput } from './TableFilterInput';
import { TableHead } from './TableHead';
import { Dessert } from '../table.types';

export const ReactTable = () => {
  const [data] = useState(() => [...tableData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const globalFilterFn = useCallback(
    (row: Row<Dessert>, columnId: string, filterValue: string) => {
      return row
        .getValue<string>(columnId)
        .toString()
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    [],
  );

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
    globalFilterFn,
  });

  const totalFilteredRows = useMemo(
    () => table.getFilteredRowModel().rows.length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table.getFilteredRowModel().rows.length],
  );

  return (
    <div className="text-sm px-4 sm:px-8 items-center justify-center text-primary-100 max-w-5xl mx-auto">
      <TableFilterInput
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <TableHead table={table} />
          <TableBody table={table} />
        </table>
      </div>
      {totalFilteredRows > 0 && (
        <PaginationControls
          table={table}
          totalRows={totalFilteredRows}
          pagination={pagination}
        />
      )}
    </div>
  );
};

ReactTable.displayName = 'ReactTable';
