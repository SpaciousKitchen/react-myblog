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

let start = 10;

while (start) {
  initialState.posts.push({
    id: start,
    subject: faker.lorem.word(),
    // createdAt: faker.date.past(),
    content: `<p><strong> ${faker.lorem.paragraphs()} </strong><br><p>${faker.lorem.paragraphs()} </p></p><p>안녕하세요</p>`,
    views: faker.random.number(),
    user: {
      name: faker.name.findName(),
      img: faker.image.people(),
    },
  });
  start -= 1;
}

export const fetchAddPost = createAsyncThunk(
  'addPostfetch',
  async (postData, { getState }) => {
    const { loading } = getState().user;
    console.log(loading);
    try {
      const response = await axios.post('/post/addpost', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchDeletePost = createAsyncThunk(
  'deletePost',
  async (postData, { getState }) => {
    const { loading } = getState().user;
    console.log('goDeletePost111', loading);
    // if (loading !== 'pending') {
    //   return;
    // }
    console.log('goDeletePost2', loading);
    try {
      const response = await axios.delete(`/post/deletePost/${postData}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
        state.error = action.payload.error;
      })
      .addCase(fetchDeletePost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'DeletePostfulfilled';
        console.log(action);
        state.posts = state.posts.filter(
          (v) => v.id !== parseInt(action.payload.postId, 10),
        );
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        console.log(action.error.message);
        state.error = action.payload.error;
      });
  },
});

export default freeBoardSlice;
