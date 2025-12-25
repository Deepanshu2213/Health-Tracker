import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '../slices/loginSlice';
import type { ResponseObj } from '../interfaces/ResponseInterface';
export interface LoginArgs {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}
const loginUser = createAsyncThunk<ResponseObj<User>, LoginArgs>(
  'login',
  async (args: LoginArgs) => {
    //createAsyncThunk<ReturnedType, ArgType>(
    const response = await axios.post<ResponseObj<User>>(
      'api/user/login',
      args
    );
    return response.data;
  }
);
export { loginUser };
