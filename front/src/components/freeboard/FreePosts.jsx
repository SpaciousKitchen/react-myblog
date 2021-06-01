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
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';
import PageNation from './PageNation';

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
  const { posts } = useSelector((state) => state.freeboard);
  const { userInfo } = useSelector((state) => state.user);
  const [nowPage, setnowPage] = useState(1);
  const [slicePage, setSlicePage] = useState(0);
  const [rowsPerPage] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchLoadPosts());
    }
  }, []);
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
                  slicePage * rowsPerPage,
                  slicePage * rowsPerPage + rowsPerPage,
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
        <PageNation
          setSlicePage={setSlicePage}
          nowPage={nowPage}
          setnowPage={setnowPage}
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
