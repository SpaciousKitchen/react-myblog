import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUserLogin = createAsyncThunk(
  'userLoginfetch',
  async (userData, { getState }) => {
    const { loading } = getState().user;
    if (loading !== 'pending') {
      return;
    }
    console.log('user/fetchByLoginStatus');
    const response = await axios.post('http://localhost:3000/user/login', {
      data: userData,
    });
    return response.data;
  },
);
const initialState = {
  userInfo: null,
  loading: 'idle',
  error: null,
};

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
        }
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.userInfo = action.payload.data;
        // state.userInfo = {
        //   id: action.data.id,
        //   name: action.data.name,
        //   img: action.data.img,
        //   eamil: action.data.email,
        //   logoUrl: action.data.logoUrl,
        //   option: action.data.option,
        // };
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        state.error = action.payload.error;
      });
  },
});
export default userSlice;
