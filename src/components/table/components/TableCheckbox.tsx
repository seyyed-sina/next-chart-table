import { memo } from 'react';

import { clx } from '@/utils/helper';

interface TableCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (event: unknown) => void;
}

export const TableCheckbox = memo(
  ({ id, checked, onChange }: TableCheckboxProps) => {
    return (
      <div className="relative size-4">
        <input
          id={id}
          className={clx(
            'appearance-none size-4 rounded bg-white cursor-pointer',
            checked && 'bg-primary-500',
          )}
          type="checkbox"
          {...{
            checked,
            onChange,
          }}
        />
        <label
          htmlFor={id}
          className="absolute cursor-pointer inset-0 size-4 flex items-center justify-center">
          <span className="hidden">checkbox label</span>
          <svg
            aria-hidden="true"
            role="presentation"
            viewBox="0 0 17 18"
            className={clx(
              'h-3 w-4 transition-opacity motion-reduce:transition-none',
              checked ? 'opacity-100' : 'opacity-0',
            )}>
            <polyline
              fill="none"
              points="1 9 7 14 15 4"
              stroke="currentColor"
              strokeDasharray="22"
              strokeDashoffset={checked ? '44' : '66'}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="transition-[stroke-dashoffset] delay-100 duration-200 ease-linear"></polyline>
          </svg>
        </label>
      </div>
    );
  },
);

TableCheckbox.displayName = 'TableCheckbox';
