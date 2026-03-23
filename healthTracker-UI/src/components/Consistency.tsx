import { type FC } from 'react';
import { VictoryChart } from 'victory';

export const ConsisTencyReport: FC = () => {
  // const changeState = (
  //   state: string,
  //   action: { type: string; payload: string },
  // ): string => {
  //   return action.payload;
  // };
  // const [state, dispatch] = useReducer(changeState, '');
  // dispatch({ type: 'update', payload: 'hello' });
  return (
    <div>
      <VictoryChart></VictoryChart>
    </div>
  );
};
