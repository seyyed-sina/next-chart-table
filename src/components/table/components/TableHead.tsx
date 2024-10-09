import { flexRender, Header, Table } from '@tanstack/react-table';

import { clx } from '@/utils/helper';

import { Dessert } from '../table.types';

interface TableHeadProps {
  table: Table<Dessert>;
}

export const TableHead = ({ table }: TableHeadProps) => {
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

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              className={clx(
                'p-3 text-left border-solid border-b-2 border-gray-400',
                header.column.id === 'name' && 'min-w-96',
                header.column.id === 'select' && 'w-10',
                header.column.id !== 'select' && 'text-sm md:text-base',
                header.column.id !== 'select' &&
                  header.column.id !== 'name' &&
                  'min-w-24',
              )}>
              {header.isPlaceholder ? null : (
                <div
                  className={clx(
                    header.column.getCanSort() && 'cursor-pointer select-none',
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
  );
};

TableHead.displayName = 'TableHead';
