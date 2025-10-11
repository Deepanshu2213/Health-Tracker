import type { FC } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory';

export const ConsistencyChart: FC = () => {
  return (
    <div style={{ width: '100vw', height: '40vh' }}>
      <VictoryChart theme={VictoryTheme.clean}>
        <VictoryAxis
          style={{
            axis: { stroke: '#FF5733' }, // Axis line color
            tickLabels: { fill: '#FF5733' }, // X labels color
            ticks: { stroke: '#FF5733' }, // Tick mark color
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: '#3498DB' }, // Y axis line color
            tickLabels: { fill: '#3498DB' }, // Y labels color
            // grid: { stroke: '#E0E0E0' }, // Optional grid line color
            ticks: { stroke: '#3498DB' },
          }}
        />
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]}
        />
      </VictoryChart>
    </div>
  );
};
