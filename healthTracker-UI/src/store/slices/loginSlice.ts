import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/loginThunks';
import { createUser } from '../thunks/CreateUser';
import { CheckToken } from '../thunks/checkToken';
import { type ResponseObj } from '../interfaces/ResponseInterface';

export interface User {
  firstName?: string;
  lastName?: string;
  id: string;
  email: string;
  password: string;
}

interface loginState {
  error: Object | null;
  data: ResponseObj<User> | undefined;
  loading: boolean | undefined;
}

const initialState: loginState = {
  data: undefined,
  error: null,
  loading: undefined,
};

// const reducers: SliceCaseReducers<loginState> = {
//   setData
// };
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: loginState) => {
      state.loading = true;
      state.error = null;
      state.data = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state: loginState, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? (action.payload as Object) : true;
    });
    builder.addCase(createUser.pending, (state: loginState) => {
      state.loading = true;
      state.error = null;
      state.data = undefined;
    });
    builder.addCase(createUser.fulfilled, (state: loginState, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? (action.payload as Object) : true;
    });
    builder.addCase(CheckToken.pending, (state: loginState) => {
      state.loading = true;
      state.error = null;
      state.data = undefined;
    });
    builder.addCase(CheckToken.fulfilled, (state: loginState, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(CheckToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ? (action.payload as Object) : true;
    });
  },
});

export const loginSliceReducer = loginSlice.reducer;
