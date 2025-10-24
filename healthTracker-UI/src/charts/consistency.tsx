import type { FC } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryCursorContainer,
  VictoryTooltip,
} from 'victory';

export const ConsistencyChart: FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '0.2rem',
      }}
      className="w-full"
    >
      <VictoryChart
        theme={VictoryTheme.clean}
        domainPadding={10}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) => {
              return `day: ${datum.x.toFixed(
                0
              )} no of workout : ${datum.y.toFixed(0)}`;
            }}
            cursorDimension="x"
            cursorLabelComponent={
              <VictoryTooltip
                cornerRadius={4}
                centerOffset={{ y: -8 }}
                flyoutStyle={{ fill: '#7E22CE', stroke: '#581C87' }}
                style={{ fontSize: 12, fill: '#E5E7EB' }}
              />
            }
            cursorComponent={
              <line
                style={{
                  stroke: '#A855F7',
                  strokeWidth: 1.5,
                  strokeDasharray: '5,5',
                }}
              />
            }
          />
        }
      >
        {/* X Axis */}
        <VictoryAxis
          style={{
            axis: { stroke: '#6B7280' },
            tickLabels: { fill: '#E5E7EB', fontSize: 12 },
            grid: { stroke: '#1F2937', strokeDasharray: '4' },
          }}
        />

        {/* Y Axis */}
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: '#6B7280' },
            tickLabels: { fill: '#E5E7EB', fontSize: 12 },
          }}
        />

        {/* Data line */}
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]}
          style={{
            data: { stroke: '#A855F7', strokeWidth: 2 },
          }}
        />
      </VictoryChart>
    </div>
  );
};
