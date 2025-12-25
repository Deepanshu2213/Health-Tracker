import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '../slices/loginSlice';
import type { LoginArgs } from './loginThunks';
import type { ResponseObj } from '../interfaces/ResponseInterface';
import { api } from '../../proxy/api';
export const createUser = createAsyncThunk<ResponseObj<User>, LoginArgs>(
  'user',
  async (user: LoginArgs) => {
    const response = await api.post<ResponseObj<User>>('user/save', user, {
      withCredentials: true,
    });
    return response.data;
  }
);
