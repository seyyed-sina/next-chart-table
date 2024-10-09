import { ResponsiveBar } from '@nivo/bar';

import { chartData } from '../chart.data';
import { ChartTooltip, ChartTooltipProps } from './ChartTooltip';
export const BarChart = () => {
  const renderTooltip = (props: ChartTooltipProps) => (
    <ChartTooltip {...props} />
  );

  return (
    <div className="h-[400px] w-full max-w-5xl mx-auto">
      <ResponsiveBar
        data={chartData}
        keys={['sales', 'expenses']}
        groupMode="grouped"
        indexBy="month"
        margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
        padding={0.3}
        innerPadding={12}
        theme={{
          grid: {
            line: {
              stroke: '#3d4259',
            },
          },
        }}
        colors={({ id }) => (id === 'sales' ? '#1f77b4' : '#be295c')}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        gridYValues={[0, 15, 30, 45, 60]}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 32,
          renderTick: (tick) => (
            <g transform={`translate(${tick.x},${tick.y + 20})`}>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fill: '#a1a1a1', // Custom gray tick color for bottom axis
                  fontSize: 12,
                }}>
                {tick.value}
              </text>
            </g>
          ),
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 8,
          tickValues: [0, 15, 30, 45, 60],
          renderTick: (tick) => (
            <g transform={`translate(${tick.x - 8},${tick.y})`}>
              <text
                textAnchor="end"
                dominantBaseline="middle"
                style={{
                  fill: '#a1a1a1', // Custom gray tick color for left axis
                  fontSize: 12,
                }}>
                {tick.value}
              </text>
            </g>
          ),
        }}
        enableLabel={false}
        role="application"
        ariaLabel="Showing bar chart"
        barAriaLabel={function (e) {
          return `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`;
        }}
        tooltip={renderTooltip}
      />
    </div>
  );
};

BarChart.displayName = 'BarChart';
