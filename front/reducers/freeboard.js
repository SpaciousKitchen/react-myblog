import faker from 'faker';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: 'idle',
  error: null,
  done: null,
  posts: [
    {
      id: 1,
      subject: '게시글 제목입니다.',
      createdAt: '2021-02-21',
      views: 500,
      user: {
        name: 'songsong',
      },
    },
  ],
};

let start = 21;

while (start) {
  initialState.posts.push({
    id: start,
    subject: faker.lorem.word(),
    createdAt: faker.date.past,
    views: faker.random.number(),
    user: {
      name: faker.name.findName(),
    },
  });
  start -= 1;
}

export const fetchAddPost = createAsyncThunk(
  'addPostfetch',
  async (postData, { getState }) => {
    const { loading } = getState().user;
    console.log('goaddPostfetch111', loading);
    // if (loading !== 'pending') {
    //   return;
    // }
    console.log('goaddPostfetch2', loading);
    const response = await axios.post('/post/addpost', postData);
    console.log(response.data);
    return response.data;
  },
);

const freeBoardSlice = createSlice({
  name: 'freeboard',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddPost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchAddPost.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'AddPostfulfilled';
        console.log(action);
        state.posts.unshift(action.payload);
      })
      .addCase(fetchAddPost.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        console.log(action.error.message);
        state.error = action.error.message;
      });
  },
});

export default freeBoardSlice;
