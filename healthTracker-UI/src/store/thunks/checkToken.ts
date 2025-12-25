import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../slices/loginSlice';
import type { ResponseObj } from '../interfaces/ResponseInterface';
import { api } from '../../proxy/api';

export const CheckToken = createAsyncThunk<ResponseObj<User>, undefined>(
  'checkToken',
  async () => {
    const response = await api.get<ResponseObj<User>>('user/checkToken', {
      withCredentials: true,
    });
    return response.data;
  }
);

// export const fetchUser = createAsyncThunk<
//   ResponseObj<User>,   // fulfilled payload
//   undefined,          // no argument
//   { rejectValue: ErrorObj }  /
