import { LoginManagerContext } from '../context/LoginManagerContext';
import { useContext } from 'react';

const useLoginContext = () => {
  return useContext(LoginManagerContext);
};

export default useLoginContext;
