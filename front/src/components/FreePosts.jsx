import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

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
    maxHeight: 440,
  },
});

const FreePosts = () => {
  const classes = useStyles();
  const history = useHistory();
  const { posts } = useSelector((state) => state.freeboard);
  const { userInfo } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onClickPost = (id) => {
    console.log(id);
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={element.id}
                    onClick={() => {
                      onClickPost(element.id);
                    }}
                  >
                    <TableCell>{index}</TableCell>
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
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {userInfo ? (
        <Button
          style={{ float: 'right' }}
          startIcon={<CreateIcon />}
          onClick={() => history.push('/write')}
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
