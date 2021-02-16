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
  async (userData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    if (loading !== 'pending') {
      return;
    }
    try {
      const response = await axios.post('/user/login', userData);
      axios.defaults.headers.common.authorization = response.data.token;
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserLogout = createAsyncThunk(
  'userLogoutfetch',
  async (userData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    if (loading !== 'pending') {
      return;
    }
    try {
      const response = await axios.post('/user/logout');
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
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
        console.log(action.payload.user);
        state.userInfo = action.payload.user;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = 'idle';
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
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
        state.loading = 'idle';
        if (action.payload) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
      });
  },
});
export default userSlice;
