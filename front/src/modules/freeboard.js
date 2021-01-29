import faker from 'faker';
import { REQUEST_ADD_POST, SUCCESS_ADD_POST, FAIL_ADD_POST } from './actions';

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

function FreeBoardReducer(state = init, action) {
  switch (action.type) {
    case REQUEST_ADD_POST: {
      return {
        ...state,
        requestAddPost: true,
        successAddPost: false,
        failAddPost: false,
      };
    }

    case SUCCESS_ADD_POST: {
      const { posts } = state;
      posts.unshift({
        id: posts.length,
        name: 'songsong',
        Content: action.data.content,
        subject: action.data.subject,
        createdAt: action.data.createdAt,
        views: action.data.views,
      });
      return {
        ...state,
        requestAddPost: false,
        successAddPost: true,
        failAddPost: false,
        posts,
      };
    }

    case FAIL_ADD_POST:
      return {
        ...state,
        requestAddPost: false,
        successAddPost: true,
        failAddPost: false,
      };

    default:
      return state;
  }
}
export default FreeBoardReducer;
