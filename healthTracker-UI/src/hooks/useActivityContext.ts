import { useContext } from 'react';
import {
  ActivityContext,
  type ActivityContextProps,
} from '../context/ActivityContext';

export const useActivityContext = (): ActivityContextProps => {
  const activityContext = useContext(ActivityContext);
  return activityContext;
};
