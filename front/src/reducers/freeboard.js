import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: 'idle',
  error: null,
  done: null,
  posts: [],
  noMorePosts: false,
};

export const fetchLoadPosts = createAsyncThunk(
  'loadPostsfetch',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/post/loadposts?offset=${postData?.offset || -1}&limit=10`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAddPost = createAsyncThunk(
  'addPostfetch',
  async (postData, { rejectWithValue }) => {
    console.log(loading);
    try {
      const response = await axios.post('/post/addpost', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchEditPost = createAsyncThunk(
  'editPostfetch',
  async (postData, { rejectWithValue }) => {
    console.log(loading);
    try {
      const response = await axios.post(
        `/post/editPost/${postData.id}`,
        postData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchDeletePost = createAsyncThunk(
  'deletePost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/post/deletePost/${postData}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAddComment = createAsyncThunk(
  'addCommentfetch',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/post/${commentData.postId}/addComment`,
        commentData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchEditComment = createAsyncThunk(
  'editCommentfetch',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/post/${commentData.postId}/editComment/${commentData.commentId}`,
        commentData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchDeleteComment = createAsyncThunk(
  'deleteComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/post/${commentData.postId}/deleteComment/${commentData.commentId}`,
      );
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
      .addCase(fetchLoadPosts.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchLoadPosts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'LoadPostsfulfilled';
        const updatedPost = state.posts.concat(action.payload);
        state.posts = updatedPost;
        state.noMorePosts = action.payload.length < 10;
      })
      .addCase(fetchLoadPosts.rejected, (state, action) => {
        state.loading = 'idle';

        state.error = action.error.message;
      })
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

        state.posts.unshift(action.payload);
      })
      .addCase(fetchAddPost.rejected, (state, action) => {
        state.loading = 'idle';

        state.error = action.payload.error;
      })
      .addCase(fetchEditPost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchEditPost.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'EditPostfulfilled';
        const index = state.posts.findIndex((v) => v.id === action.payload.id);
        state.posts[index] = action.payload;
      })
      .addCase(fetchEditPost.rejected, (state, action) => {
        state.loading = 'idle';
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
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

        state.posts = state.posts.filter(
          (v) => v.id !== parseInt(action.payload.postId, 10),
        );
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
        state.loading = 'idle';

        state.error = action.payload.error;
      })
      .addCase(fetchAddComment.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'AddCommentfulfilled';
        const index = state.posts.findIndex(
          (v) => v.id === action.payload.postId,
        );
        if (!state.posts[index].freecomments) {
          state.posts[index].freecomments = [];
        }
        state.posts[index].freecomments.push(action.payload.comment);
      })
      .addCase(fetchAddComment.rejected, (state, action) => {
        state.loading = 'idle';

        state.error = action.payload.error;
      })
      .addCase(fetchEditComment.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchEditComment.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'EditCommentfulfilled';
        const changeComment = action.payload.content;
        const index = state.posts.findIndex(
          (v) => v.id === action.payload.freepostId,
        );
        const commentIndex = state.posts[index].freecomments.findIndex(
          (v) => v.id === action.payload.id,
        );
        state.posts[index].freecomments[commentIndex].content = changeComment;
      })
      .addCase(fetchEditComment.rejected, (state, action) => {
        state.loading = 'idle';

        state.error = action.payload.error;
      })
      .addCase(fetchDeleteComment.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchDeleteComment.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'DeleteCommentfulfilled';

        const index = state.posts.findIndex(
          (v) => v.id === action.payload.postId,
        );

        state.posts[index].freecomments = state.posts[
          index
        ].freecomments.filter((v) => v.id !== action.payload.commentId);
      })
      .addCase(fetchDeleteComment.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload.error;
      });
  },
});

export default freeBoardSlice;
