import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '../slices/loginSlice';
import type { LoginArgs } from './loginThunks';
import type { ResponseObj } from '../interfaces/ResponseInterface';
export const createUser = createAsyncThunk<ResponseObj<User>, LoginArgs>(
  'user',
  async (user: LoginArgs) => {
    const response = await axios.post<ResponseObj<User>>('api/user/save', user);
    return response.data;
  }
);
