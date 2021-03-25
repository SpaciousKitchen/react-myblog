import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoadPosts } from 'reducers/freeboard';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';

const columns = [
  { label: 'Number', minWidth: 100 },
  { label: 'Subject', minWidth: 340 },
  {
    label: 'Name',
    minWidth: 170,
    align: 'right',
  },
  {
    label: 'createdAt',
    minWidth: 170,
    align: 'right',
  },
  {
    label: 'Views',
    minWidth: 170,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 650,
  },
});

const FreePosts = () => {
  const classes = useStyles();
  const history = useHistory();
  const { posts, noMorePosts } = useSelector((state) => state.freeboard);
  const { userInfo } = useSelector((state) => state.user);
  const [curPage, setCurPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoadPosts());
  }, []);
  const onHadlePage = (e, next) => {
    const newPage = next;

    if (!noMorePosts && (curPage + 2) * rowsPerPage >= posts.length) {
      dispatch(fetchLoadPosts({ offset: posts[posts.length - 1].id }));
      setCurPage(newPage);
    } else {
      setCurPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const onClickPost = (id) => {
    history.push(`/freecontent/${id}`);
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {posts
                .slice(
                  curPage * rowsPerPage,
                  curPage * rowsPerPage + rowsPerPage,
                )
                .map((element) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={element.id}
                    onClick={() => {
                      onClickPost(element.id);
                    }}
                  >
                    <TableCell>{element.id}</TableCell>
                    <TableCell>{element.subject}</TableCell>
                    <TableCell>{element?.user.name}</TableCell>
                    <TableCell>{element.createdAt}</TableCell>
                    <TableCell>{element.views}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={curPage}
          count={posts.length}
          onChangePage={onHadlePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      {userInfo ? (
        <Button
          style={{ float: 'right' }}
          startIcon={<CreateIcon />}
          onClick={() => history.push('/write/freepost')}
        >
          글쓰기
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};
export default FreePosts;
