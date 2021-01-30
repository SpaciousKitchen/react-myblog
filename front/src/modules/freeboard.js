import faker from 'faker';

export const sucessAddPost = createAction('SUCCESS_ADD_POST');
export const failsAddPost = createAction('FAILS_ADD_POST');

const init = {
  posts: [
    {
      id: 1,
      name: 'songsong',
      subject: '게시글 제목입니다.',
      createdAt: '2021-02-21',
      views: 500,
    },
  ],
  requestAddPost: false,
  successAddPost: false,
  failAddPost: false,
};

let start = 21;

while (start) {
  init.posts.push({
    id: start,
    name: faker.name.findName(),
    subject: faker.lorem.word(),
    createdAt: faker.date.past,
    views: faker.random.number(),
  });
  start -= 1;
}

const freeBoardReducer = createReducer(init, (builder) => {
  builder
    .addCase(sucessAddPost, (state, action) => {
      state.requestAddPost = false;
      state.successAddPost = true;
      state.failAddPost = false;
      state.posts.unshift({
        id: posts.length,
        name: 'songsong',
        Content: action.data.content,
        subject: action.data.subject,
        createdAt: action.data.createdAt,
        views: action.data.views,
      });
    })
    .addCase(failsAddPost, (state) => {
      state.requestAddPost = false;
      state.successAddPost = true;
      state.failAddPost = false;
    });
});

export default freeBoardReducer;
