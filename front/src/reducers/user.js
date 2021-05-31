import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: 'idle',
  error: null,
  done: null,
};

export const fetchLoadUserInfo = createAsyncThunk(
  'loadUserInfofetch',
  async (userData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    if (loading !== 'pending') {
      return;
    }
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken) {
        const response = await axios.get('/user/loadUserInfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserLogin = createAsyncThunk(
  'userLoginfetch',
  async (userData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    if (loading !== 'pending') {
      return;
    }
    try {
      const response = await axios.post('/user/login', userData);
      return response.data;
    } catch (error) {
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
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      return true;
    } catch (error) {
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
      .addCase(fetchLoadUserInfo.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchLoadUserInfo.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'Loginfulfilled';

        state.userInfo = action.payload?.user;
        window.localStorage.setItem('accessToken', action.payload?.token);
      })
      .addCase(fetchLoadUserInfo.rejected, (state, action) => {
        state.loading = 'idle';

        if (action.payload) {
          if (action.payload.code === 1010) {
            const refreshToken = window.localStorage.getItem('refreshToken');
            axios
              .get('/user/loadUserInfo', {
                headers: { Authorization: `Bearer ${refreshToken}` },
              })
              .then((res) => {
                window.localStorage.setItem('accessToken', res.data.token);
                state.userInfo = action.payload?.user;
              })
              .catch((err) => {
                state.userInfo = err.response?.message;
              });
          }
        } else {
          state.error = action.error.message;
        }
      })
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

        window.localStorage.setItem('accessToken', action.payload?.accessToken);
        window.localStorage.setItem(
          'refreshToken',
          action.payload.refreshToken,
        );
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
