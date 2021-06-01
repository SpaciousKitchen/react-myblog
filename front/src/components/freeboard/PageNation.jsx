import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { fetchLoadPosts } from 'reducers/freeboard';
import styled from 'styled-components';

const PageNationContainer = styled.div`
  margin: 2em 0 1em 0;
  :after,
  ul:after {
    clear: both;
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
  }
  ul {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  li {
    /*float: left;*/
    list-style: none;
    margin-left: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  li:first-child {
    margin-left: 0;
  }
  span.active {
    background-color: rgba(0, 0, 0, 0.54);
    border-radius: 3px;
    color: #ffffff;
    cursor: not-allowed;
    padding: 10px 20px;
  }

  li span {
    background: none repeat scroll 0 0 rgba(224, 224, 224, 1);
    border-radius: 3px;
    color: #ffffff;
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);
  }
  li span:hover {
    background-color: rgba(0, 0, 0, 0.54);
    color: #ffffff;
    opacity: 0.8;
    transition-duration: 500ms;
    transition-property: all;
    transition-timing-function: ease;
  }
  li.prev span,
  li.next span {
    padding-bottom: 9px;
  }
  li.prev span::before,
  li.next span::after {
    font-family: 'FontAwesome';
    color: #fff;
    font-weight: bold;
  }
  li.prev span::before {
    margin-right: 10px;
  }
  li.next span::after {
    margin-left: 10px;
  }
`;

const PageNation = ({ setSlicePage, nowPage, setnowPage }) => {
  const [curPage, setCurPage] = useState(1);
  const dispatch = useDispatch();
  const { posts, hasMorePosts } = useSelector((state) => state.freeboard);

  const pagesNums = [1, 2, 3, 4, 5];

  useEffect(() => {
    console.log('change', curPage, nowPage);
  }, [curPage, nowPage]);

  const onClickLoadPage = useCallback((movePage, index) => {
    setnowPage(movePage);
    setSlicePage(index);
  }, []);

  const onClickNextPage = useCallback(() => {
    dispatch(
      fetchLoadPosts({
        cursor: posts[posts.length - 1]?.id,
        next: 1,
        limit: 10,
      }),
    );
    setnowPage(curPage + 5);
    setCurPage((pre) => pre + 5);
    setSlicePage(0);
  }, [posts, curPage, nowPage]);
  const onClickPrePage = useCallback(() => {
    const cur = curPage;
    setnowPage(cur - 5 + 4);
    setCurPage(cur - 5);
    setSlicePage(4);
    dispatch(
      fetchLoadPosts({
        cursor: posts[0]?.id,
        next: -1,
        limit: 10,
      }),
    );
  }, [posts, curPage, nowPage]);
  return (
    <PageNationContainer>
      <ul>
        {curPage > 1 && (
          <li className="prev">
            <span onClick={onClickPrePage}>Prev</span>
          </li>
        )}

        {pagesNums.map((num, index) => (
          <li onClick={() => onClickLoadPage(curPage + index, index)}>
            <span
              className={classnames({ active: nowPage === curPage + index })}
            >
              {' '}
              {curPage + index}
            </span>
          </li>
        ))}

        {!hasMorePosts && (
          <li className="next">
            <span onClick={onClickNextPage}>Next</span>
          </li>
        )}
      </ul>
    </PageNationContainer>
  );
};

export default PageNation;
