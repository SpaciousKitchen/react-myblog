import faker from 'faker';
import { REQUEST_ADD_POST, SUCCESS_ADD_POST, FAIL_ADD_POST } from './actions';

const init = {
  posts: [
    {
      id: 1,
      name: 'songsong',
      subject: '게시글 제목입니다.',
      date: '2021-02-21',
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
    date: faker.date.past,
    views: faker.random.number(),
  });
  start -= 1;
}

function FreeBoardReducer(state = init, action) {
  switch (action.type) {
    case REQUEST_ADD_POST: {
      const { posts } = state;
      posts.push({
        id: 3,
        name: 'songsong',
        Content: action.data.content,
        subject: action.data.subject,
        date: faker.time.past,
        views: faker.random.number(),
      });

      return {
        ...state,
        requestAddPost: true,
        successAddPost: false,
        failAddPost: false,
        posts,
      };
    }

    case SUCCESS_ADD_POST:
      return {
        ...state,
        requestAddPost: false,
        successAddPost: true,
        failAddPost: false,
      };
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
