import { ChangeEvent, memo } from 'react';

interface TableFilterInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TableFilterInput = memo(
  ({ value, onChange }: TableFilterInputProps) => {
    return (
      <div className="flex items-center justify-between gap-5 mb-6 flex-wrap">
        <h1 className="text-center text-xl text-primary-100 font-bold">
          Nutrition Table
        </h1>
        <input
          type="search"
          value={value}
          placeholder="Search desserts..."
          className="px-3 font-base text-black rounded focus:outline-0 min-w-[300px] bg-primary-100 focus:bg-white min-h-10"
          onChange={onChange}
        />
      </div>
    );
  },
);

TableFilterInput.displayName = 'TableFilterInput';
