import {
  createContext,
  useState,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
} from 'react';

export interface ActivityContextProps {
  selection: string | undefined;
  setSelection: Dispatch<SetStateAction<string | undefined>>;
}
export const ActivityContext = createContext<ActivityContextProps>({
  selection: undefined,
  setSelection: () => {},
});

interface ActivityContextProviderProps {
  children: ReactNode;
}
export const ActivityContextProvider: FC<ActivityContextProviderProps> = ({
  children,
}) => {
  const [selection, setSelection] = useState<string>();
  return (
    <ActivityContext.Provider value={{ selection, setSelection }}>
      {children}
    </ActivityContext.Provider>
  );
};
