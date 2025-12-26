import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User } from '../slices/loginSlice';
import type { ResponseObj } from '../interfaces/ResponseInterface';

export const CheckToken = createAsyncThunk<ResponseObj<User>, undefined>(
  'checkToken',
  async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const response = await axios.get<ResponseObj<User>>(
      `api/user/checkToken${token ? `/?token=${token}` : ''}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

// export const fetchUser = createAsyncThunk<
//   ResponseObj<User>,   // fulfilled payload
//   undefined,          // no argument
//   { rejectValue: ErrorObj }  /
