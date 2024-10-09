import { flexRender, Table } from '@tanstack/react-table';

import { clx } from '@/utils/helper';

import { Dessert } from '../table.types';

interface TableBodyProps {
  table: Table<Dessert>;
}

export const TableBody = ({ table }: TableBodyProps) => {
  return (
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
              className={clx(
                'px-3 py-4 border-b border-solid border-gray-500',
                cell.column.id !== 'name' && 'text-center',
                cell.column.id !== 'select' && 'text-sm md:text-base',
              )}>
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
  );
};

TableBody.displayName = 'TableBody';
