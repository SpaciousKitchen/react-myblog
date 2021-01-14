import faker from 'faker';

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
  switch (action) {
    default:
      return state;
  }
}
export default FreeBoardReducer;
