import { useContext } from 'react';
import { ResizeContext } from '../context/ResizeContexProvider';

export const useResizeContext = () => {
  return useContext(ResizeContext);
};
