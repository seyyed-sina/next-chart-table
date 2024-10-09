import { memo, useMemo } from 'react';

export interface ChartTooltipProps {
  id: string | number;
  value: number;
  color: string;
}

export const ChartTooltip = memo(({ id, value, color }: ChartTooltipProps) => {
  const boxStyle = useMemo(() => {
    return {
      color,
    };
  }, [color]);

  const colorBoxStyle = useMemo(() => {
    return {
      backgroundColor: color,
    };
  }, [color]);

  return (
    <div
      style={boxStyle}
      className="flex place-items-center text-center px-3 py-1 rounded-sm text-sm gap-1 bg-white shadow-sm">
      <span className="size-3 rounded-sm" style={colorBoxStyle} />
      <span className="capitalize">{id}</span>:
      <span className="font-bold">{value}</span>
    </div>
  );
});

ChartTooltip.displayName = 'ChartTooltip';
