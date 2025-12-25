import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../slices/loginSlice';
import type { ResponseObj } from '../interfaces/ResponseInterface';
import { api } from '../../proxy/api';
export interface LoginArgs {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}
const loginUser = createAsyncThunk<ResponseObj<User>, LoginArgs>(
  'login',
  async (args: LoginArgs) => {
    //createAsyncThunk<ReturnedType, ArgType>(
    const response = await api.post<ResponseObj<User>>('user/login', args, {
      withCredentials: true,
    });
    return response.data;
  }
);
export { loginUser };
