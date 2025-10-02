import { createContext, useEffect, type FC, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';
import { CheckToken, type loginDispatch } from '../store';
import { useDispatch } from 'react-redux';

interface LoginManager {
  login: boolean;
}
interface LoginManagerProviderProps {
  children: ReactNode;
}

export const LoginManagerContext = createContext<LoginManager>({
  login: false,
});

export const LoginManagerProvider: FC<LoginManagerProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch<loginDispatch>();
  const { data } = useSelector((state: RootState) => state.login);
  const login = !!data;
  useEffect(() => {
    dispatch(CheckToken());
  }, []);
  return (
    <LoginManagerContext.Provider value={{ login }}>
      {children}
    </LoginManagerContext.Provider>
  );
};
