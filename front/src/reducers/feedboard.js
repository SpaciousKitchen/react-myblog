import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: 'idle',
  error: null,
  done: null,
  feedposts: [],
};

export const fetchLoadfeedPosts = createAsyncThunk(
  'loadfeedPostsfetch',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.get('/feedpost/loadfeedposts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchFeedAddPost = createAsyncThunk(
  'fetchFeedAddPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/feedpost/addpost', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchEditPost = createAsyncThunk(
  'editPostfetch',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/feedpost/editPost/${postData.id}`,
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
      const response = await axios.delete(`/feedpost/deletePost/${postData}`);
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
        `/feedpost/${commentData.postId}/addComment`,
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
        `/feedpost/${commentData.postId}/editComment/${commentData.commentId}`,
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
        `/feedpost/${commentData.postId}/deleteComment/${commentData.commentId}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const feedBoardSlice = createSlice({
  name: 'feedboard',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoadfeedPosts.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchLoadfeedPosts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'LoadfeedPostsfulfilled';

        state.feedposts = action.payload;
      })
      .addCase(fetchLoadfeedPosts.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload.error;
      })
      .addCase(fetchFeedAddPost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchFeedAddPost.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'AddPostfulfilled';
        state.feedposts.unshift(action.payload);
      })
      .addCase(fetchFeedAddPost.rejected, (state, action) => {
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

        const index = state.feedposts.findIndex(
          (v) => v.id === action.payload.id,
        );
        state.feedposts[index] = action.payload;
        // state.feedposts.unshift(action.payload);
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
        state.feedposts = state.feedposts.filter(
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
        const index = state.feedposts.findIndex(
          (v) => v.id === action.payload.postId,
        );
        if (!state.feedposts[index].feedcomments) {
          state.feedposts[index].feedcomments = [];
        }
        state.feedposts[index].feedcomments.push(action.payload.comment);
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
        const index = state.feedposts.findIndex(
          (v) => v.id === action.payload.feedpostId,
        );
        const commentIndex = state.feedposts[index].feedcomments.findIndex(
          (v) => v.id === action.payload.id,
        );
        state.feedposts[index].feedcomments[
          commentIndex
        ].content = changeComment;
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
        const index = state.feedposts.findIndex(
          (v) => v.id === action.payload.postId,
        );

        state.feedposts[index].feedcomments = state.feedposts[
          index
        ].feedcomments.filter((v) => v.id !== action.payload.commentId);
      })
      .addCase(fetchDeleteComment.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload.error;
      });
  },
});

export default feedBoardSlice;
