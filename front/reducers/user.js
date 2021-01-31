import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: 'idle',
  error: null,
  done: null,
};

export const fetchUserLogin = createAsyncThunk(
  'userLoginfetch',
  async (userData, { getState }) => {
    const { loading } = getState().user;
    if (loading !== 'pending') {
      return;
    }
    console.log('user/fetchByLoginStatus');
    const response = await axios.post('/user/login', userData);
    return response.data;
  },
);

export const fetchUserLogout = createAsyncThunk(
  'userLogoutfetch',
  async (userData, { getState }) => {
    const { loading } = getState().user;
    if (loading !== 'pending') {
      return;
    }
    console.log('user/fetchByLogoutStatus');
    const response = await axios.post('/user/logout');
    return response.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'Loginfulfilled';
        console.log(action.payload);
        state.userInfo = {
          id: action.payload.id,
          name: action.payload.name,
          img: action.payload.img,
          eamil: action.payload.email,
          logoUrl: action.payload.logoUrl,
          option: action.payload.option,
        };
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        console.log(action);
        state.error = action.error.message;
      })
      .addCase(fetchUserLogout.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.done = null;
          state.error = null;
        }
      })
      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.loading = 'idle';
        state.done = 'Logoutfulfilled';
        state.userInfo = null;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        console.log('rejected');
        console.log(action.payload);
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});
export default userSlice;
