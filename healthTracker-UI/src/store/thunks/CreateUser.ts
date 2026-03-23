import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '../slices/loginSlice';
import type { ResponseObj } from '../interfaces/ResponseInterface';
import type { LoginFormType } from '../../schemas/loginForm';
export const createUser = createAsyncThunk<ResponseObj<User>, LoginFormType>(
  'user',
  async (user: LoginFormType) => {
    const response = await axios.post<ResponseObj<User>>('api/user/save', user);
    return response.data;
  },
);
