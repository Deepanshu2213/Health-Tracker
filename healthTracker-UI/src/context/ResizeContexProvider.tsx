import {
  createContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from 'react';

interface ResizeCordinates {
  width: number;
  height: number;
}
const ResizeContext = createContext<ResizeCordinates>({
  height: window.innerHeight,
  width: window.innerWidth,
});

interface ResizeContextProviderProps {
  children: ReactNode;
}

export const ResizeContextProvider: FC<ResizeContextProviderProps> = ({
  children,
}) => {
  const [width, setWidth] = useState<number>(window.innerHeight);
  const [height, setHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    const resizeListner = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeListner);
    return () => {
      window.removeEventListener('resize', resizeListner);
    };
  }, [height, width]);
  return (
    <ResizeContext.Provider value={{ width, height }}>
      {children}
    </ResizeContext.Provider>
  );
};
